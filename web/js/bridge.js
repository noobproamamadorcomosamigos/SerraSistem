(function () {
    var callbacks = {};
    var requestId = 0;

    window.ui = {
        applyResponse: function (id, resposta) {
            if (callbacks[id]) {
                if (typeof resposta === 'string' &&
                    resposta.charAt(0) === '"') {
                    try {
                        resposta = JSON.parse(resposta);
                    } catch (erro) {}
                }
                callbacks[id](resposta);
                delete callbacks[id];
            }
        }
    };

    function chamarNim(nome, dados, sucesso, falha) {
        var id = requestId++;
        var tentativas = 0;
        callbacks[id] = sucesso;

        function enviar() {
            if (window.nimview && typeof window.nimview.call === 'function') {
                window.nimview.call(JSON.stringify({
                    request: nome,
                    data: dados,
                    requestId: id
                }));
                return;
            }

            tentativas++;
            if (tentativas >= 100) {
                delete callbacks[id];
                if (falha) {
                    falha(new Error('A ponte nativa do Nim não foi encontrada.'));
                }
                return;
            }
            setTimeout(enviar, 50);
        }

        enviar();
    }

    window.backend = {
        validarLogin: function (usuario, senha, sucesso, falha) {
            chamarNim('validarLogin', [usuario, senha], sucesso, falha);
        },
        criarConta: function (dados, sucesso, falha) {
            chamarNim('criarConta', [JSON.stringify(dados)], sucesso, falha);
        },
        frontendError: function (mensagem) {
            chamarNim('frontendError', [mensagem], function () {}, null);
        }
    };
})();
