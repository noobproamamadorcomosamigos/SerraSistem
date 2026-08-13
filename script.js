// Dados Iniciais Padrão
var defaultProducts = [
    { code: "789001", name: "Arroz 5kg", price: 28.90, stock: 8, category: "Alimentos" },
    { code: "789002", name: "Feijao 1kg", price: 8.50, stock: 4, category: "Alimentos" },
    { code: "789003", name: "Leite 1L", price: 5.99, stock: 12, category: "Bebidas" },
    { code: "789004", name: "Cafe 500g", price: 18.90, stock: 3, category: "Alimentos" }
];

// Estado da Aplicacao (Local Storage)
var products = [];
var salesHistory = [];
var cart = [];
var selectedPaymentMethod = "Dinheiro";

// Carregar Dados Salvos ou Usar Padrao
var savedProducts = localStorage.getItem('products');
if (savedProducts) {
    products = JSON.parse(savedProducts);
} else {
    products = defaultProducts;
}

var savedSales = localStorage.getItem('salesHistory');
if (savedSales) {
    salesHistory = JSON.parse(savedSales);
}

document.addEventListener('DOMContentLoaded', function() {

    updateProductsTable();
    updateDashboard();
    updateLowStockTable();
    updateSalesHistoryTable();

    // 1. Controle de Navegacao de Abas
    var tabs = document.querySelectorAll('.nav-tab');
    var tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetTabId) {
        var i;
        for (i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }
        for (i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        var activeTabBtn = document.querySelector('[data-tab="' + targetTabId + '"]');
        var activeContent = document.getElementById(targetTabId);

        if (activeTabBtn && activeContent) {
            activeTabBtn.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    for (var t = 0; t < tabs.length; t++) {
        tabs[t].addEventListener('click', function() {
            var target = this.getAttribute('data-tab');
            switchTab(target);
        });
    }

    // 2. Cadastro de Novos Produtos
    var productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var code = document.getElementById('prod-code').value.replace(/^\s+|\s+$/g, '');
            var name = document.getElementById('prod-name').value.replace(/^\s+|\s+$/g, '');
            var category = document.getElementById('prod-category').value;
            var price = parseFloat(document.getElementById('prod-price').value);
            var stock = parseInt(document.getElementById('prod-stock').value, 10);

            // Verificar duplicidade com laço for
            var exists = false;
            for (var i = 0; i < products.length; i++) {
                if (products[i].code === code) {
                    exists = true;
                    break;
                }
            }

            if (exists) {
                alert('Codigo de barras ja cadastrado!');
                return;
            }

            products.push({
                code: code,
                name: name,
                category: category,
                price: price,
                stock: stock
            });

            saveData();
            updateProductsTable();
            updateDashboard();
            updateLowStockTable();

            productForm.reset();
            alert('Produto cadastrado com sucesso!');
        });
    }

    // 3. Adicionar Produto ao Carrinho (PDV)
    var pdvForm = document.getElementById('pdv-add-form');
    var barcodeInput = document.getElementById('barcode-input');

    if (pdvForm) {
        pdvForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var code = barcodeInput.value.replace(/^\s+|\s+$/g, '');
            if (!code) return;

            var product = null;
            for (var i = 0; i < products.length; i++) {
                if (products[i].code === code) {
                    product = products[i];
                    break;
                }
            }

            if (!product) {
                alert('Produto nao encontrado!');
                return;
            }

            if (product.stock <= 0) {
                alert('Produto sem estoque disponivel!');
                return;
            }

            var cartItem = null;
            for (var j = 0; j < cart.length; j++) {
                if (cart[j].code === code) {
                    cartItem = cart[j];
                    break;
                }
            }

            if (cartItem) {
                if (cartItem.qtd + 1 > product.stock) {
                    alert('Quantidade ultrapassa o estoque disponivel!');
                    return;
                }
                cartItem.qtd++;
            } else {
                cart.push({
                    code: product.code,
                    name: product.name,
                    price: product.price,
                    qtd: 1
                });
            }

            barcodeInput.value = '';
            updateCartUI();
        });
    }

    // 4. Formas de Pagamento e Troco
    var paymentBtns = document.querySelectorAll('.btn-payment');
    for (var p = 0; p < paymentBtns.length; p++) {
        paymentBtns[p].addEventListener('click', function() {
            for (var k = 0; k < paymentBtns.length; k++) {
                paymentBtns[k].classList.remove('active');
            }
            this.classList.add('active');
            selectedPaymentMethod = this.getAttribute('data-method');
        });
    }

    var receivedInput = document.getElementById('received-value');
    if (receivedInput) {
        receivedInput.addEventListener('keyup', calculateChange);
        receivedInput.addEventListener('change', calculateChange);
    }

    function calculateChange() {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
            total += (cart[i].price * cart[i].qtd);
        }

        var received = parseFloat(receivedInput.value) || 0;
        var change = received - total;

        var changeElem = document.getElementById('change-value');
        if (change > 0) {
            changeElem.innerText = 'R$ ' + change.toFixed(2);
        } else {
            changeElem.innerText = 'R$ 0,00';
        }
    }

    // 5. Finalizar Venda
    var btnFinish = document.getElementById('btn-finish-sale');
    if (btnFinish) {
        btnFinish.addEventListener('click', finishSale);
    }

    function finishSale() {
        if (cart.length === 0) {
            alert('Carrinho esta vazio!');
            return;
        }

        var total = 0;
        var totalItemsCount = 0;

        for (var i = 0; i < cart.length; i++) {
            total += (cart[i].price * cart[i].qtd);
            totalItemsCount += cart[i].qtd;

            // Atualiza Estoque
            for (var j = 0; j < products.length; j++) {
                if (products[j].code === cart[i].code) {
                    products[j].stock -= cart[i].qtd;
                    break;
                }
            }
        }

        var now = new Date();
        var dateStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes();

        salesHistory.push({
            date: dateStr,
            total: total,
            payment: selectedPaymentMethod,
            itemsCount: totalItemsCount
        });

        saveData();
        cart = [];
        receivedInput.value = '';
        updateCartUI();
        updateProductsTable();
        updateDashboard();
        updateLowStockTable();
        updateSalesHistoryTable();

        alert('Venda finalizada com sucesso!');
    }

    // Cancelar Venda
    var btnCancel = document.getElementById('btn-cancel-sale');
    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            if (confirm('Deseja cancelar a venda atual?')) {
                cart = [];
                receivedInput.value = '';
                updateCartUI();
            }
        });
    }

    // Resetar Dados
    var btnReset = document.getElementById('btn-reset-data');
    if (btnReset) {
        btnReset.addEventListener('click', function() {
            if (confirm('Deseja redefinir os dados para o padrao inicial?')) {
                localStorage.clear();
                products = defaultProducts;
                salesHistory = [];
                saveData();
                location.reload();
            }
        });
    }

    // Funcoes de Atualizacao de UI (DOM)
    function updateCartUI() {
        var cartItemsBody = document.getElementById('cart-items');
        cartItemsBody.innerHTML = '';
        var total = 0;
        var count = 0;

        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            var itemTotal = item.price * item.qtd;
            total += itemTotal;
            count += item.qtd;

            var row = document.createElement('tr');
            row.innerHTML = '<td>' + item.name + '</td>' +
                            '<td>' + item.qtd + '</td>' +
                            '<td>R$ ' + item.price.toFixed(2) + '</td>' +
                            '<td>R$ ' + itemTotal.toFixed(2) + '</td>' +
                            '<td><button class="btn-icon btn-remove-cart" data-index="' + i + '">×</button></td>';
            cartItemsBody.appendChild(row);
        }

        document.getElementById('cart-total').innerText = 'R$ ' + total.toFixed(2);
        document.getElementById('cart-item-count').innerHTML = '<strong>' + count + '</strong> itens no carrinho';
        calculateChange();

        // Eventos para remover item
        var removeBtns = cartItemsBody.querySelectorAll('.btn-remove-cart');
        for (var b = 0; b < removeBtns.length; b++) {
            removeBtns[b].addEventListener('click', function() {
                var idx = parseInt(this.getAttribute('data-index'), 10);
                cart.splice(idx, 1);
                updateCartUI();
            });
        }
    }

    function updateProductsTable() {
        var tbody = document.getElementById('products-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + p.code + '</td>' +
                            '<td>' + p.name + '</td>' +
                            '<td>R$ ' + p.price.toFixed(2) + '</td>' +
                            '<td>' + p.stock + '</td>' +
                            '<td><button class="btn btn-danger btn-sm btn-delete-prod" data-index="' + i + '">Excluir</button></td>';
            tbody.appendChild(row);
        }

        var deleteBtns = tbody.querySelectorAll('.btn-delete-prod');
        for (var d = 0; d < deleteBtns.length; d++) {
            deleteBtns[d].addEventListener('click', function() {
                var idx = parseInt(this.getAttribute('data-index'), 10);
                if (confirm('Remover produto?')) {
                    products.splice(idx, 1);
                    saveData();
                    updateProductsTable();
                    updateDashboard();
                    updateLowStockTable();
                }
            });
        }
    }

    function updateLowStockTable() {
        var tbody = document.getElementById('low-stock-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        for (var i = 0; i < products.length; i++) {
            if (products[i].stock <= 5) {
                var p = products[i];
                var row = document.createElement('tr');
                row.innerHTML = '<td>' + p.code + '</td>' +
                                '<td>' + p.name + '</td>' +
                                '<td>' + p.stock + '</td>' +
                                '<td><span class="badge warning">Baixo</span></td>';
                tbody.appendChild(row);
            }
        }
    }

    function updateDashboard() {
        var totalVendasDia = 0;
        for (var i = 0; i < salesHistory.length; i++) {
            totalVendasDia += salesHistory[i].total;
        }

        var lowStockCount = 0;
        for (var j = 0; j < products.length; j++) {
            if (products[j].stock <= 5) {
                lowStockCount++;
            }
        }

        var elemVendas = document.getElementById('dash-vendas-hoje');
        var elemQtd = document.getElementById('dash-qtd-vendas');
        var elemProds = document.getElementById('dash-total-produtos');
        var elemBaixo = document.getElementById('dash-estoque-baixo');

        if (elemVendas) elemVendas.innerText = 'R$ ' + totalVendasDia.toFixed(2);
        if (elemQtd) elemQtd.innerText = salesHistory.length;
        if (elemProds) elemProds.innerText = products.length;
        if (elemBaixo) elemBaixo.innerText = lowStockCount;
    }

    function updateSalesHistoryTable() {
        var tbody = document.getElementById('sales-history-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        for (var i = salesHistory.length - 1; i >= 0; i--) {
            var sale = salesHistory[i];
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + sale.date + '</td>' +
                            '<td>' + sale.itemsCount + ' itens</td>' +
                            '<td>' + sale.payment + '</td>' +
                            '<td>R$ ' + sale.total.toFixed(2) + '</td>';
            tbody.appendChild(row);
        }
    }

    function saveData() {
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));
    }

    // Atalhos Teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F8') {
            e.preventDefault();
            var btnC = document.getElementById('btn-cancel-sale');
            if (btnC) btnC.click();
        }
        if (e.key === 'F9') {
            e.preventDefault();
            finishSale();
        }
    });
});