# SerraSistema

# SistemaSerra — Descrição completa do projeto

O **SistemaSerra** é um sistema de gestão comercial integrado desenvolvido como um projeto pessoal de software. Seu objetivo é centralizar, em uma única aplicação, as principais operações de um estabelecimento comercial, reunindo **vendas, caixa, estoque, produtos, funcionários, cargos, permissões e gerenciamento administrativo** em uma estrutura única e organizada.

A ideia do SistemaSerra é evitar a necessidade de utilizar vários programas independentes para administrar diferentes partes do estabelecimento. Em vez de existir um programa separado para o caixa, outro para o estoque e outro para o gerenciamento de funcionários, o SistemaSerra reúne essas funções dentro da mesma plataforma.

Cada funcionário possui acesso às funções necessárias para seu trabalho, de acordo com seu cargo e suas permissões.

***

## Estrutura do sistema

O SistemaSerra possui uma estrutura baseada em diferentes **cargos e níveis de acesso**.

Os principais cargos previstos são:

* **Administrador**
* **Gerente**
* **Operador**
* **Estoquista**
* **Vendedor**

Cada cargo possui responsabilidades diferentes e, consequentemente, acesso a diferentes partes do sistema. Um operador, por exemplo, não precisa ter acesso às configurações administrativas, enquanto o administrador possui controle mais amplo sobre o sistema.

Essa divisão também ajuda a manter as informações organizadas e evita que funcionários modifiquem dados ou configurações que não fazem parte de suas funções.

### Administrador

O administrador possui o maior nível de acesso do SistemaSerra.

Ele é responsável pelo gerenciamento geral do sistema, incluindo configurações, funcionários, permissões, máquinas conectadas, sincronização, backups e outras operações administrativas e técnicas.

### Gerente

O gerente possui um nível elevado de acesso e trabalha principalmente com o gerenciamento do estabelecimento.

Ele pode acompanhar vendas, estoque, funcionários, relatórios e outras informações administrativas, de acordo com as permissões definidas pelo administrador.

### Operador

O operador é responsável principalmente pelas operações de **caixa e vendas**.

Para esse funcionário existe o **Modo Operador**, uma interface específica dentro do próprio SistemaSerra.

Uma das características do projeto é justamente não transformar o caixa em um programa separado. O operador utiliza o próprio SistemaSerra para registrar vendas e realizar as operações necessárias durante o atendimento.

### Estoquista

O estoquista trabalha principalmente com o **controle de estoque e produtos**.

Ele pode acompanhar as quantidades disponíveis, registrar entradas e saídas, realizar ajustes e trabalhar com outras operações relacionadas ao estoque, de acordo com suas permissões.

### Vendedor

O vendedor possui funções relacionadas ao processo de venda e atendimento ao cliente.

Suas funções são separadas das funções do operador de caixa, permitindo que o sistema represente diferentes atividades existentes dentro de um estabelecimento.

***

## Autenticação e identificação

O SistemaSerra possui uma proposta própria para autenticação dos funcionários.

Para os cargos de **administrador e gerente**, o acesso utiliza uma **chave física**.

Já os cargos de **operador, estoquista e vendedor** utilizam **crachás**.

A ideia é relacionar a identificação física do funcionário ao seu acesso dentro do sistema. Dessa forma, o método de autenticação também acompanha a estrutura de cargos e permissões.

Além da autenticação, o sistema mantém informações sobre os funcionários, seus cargos, permissões, acessos e operações realizadas.

***

## Vendas e caixa

O módulo de vendas é uma das partes centrais do SistemaSerra.

Por meio do **Modo Operador**, o funcionário responsável pelo caixa pode realizar as operações de venda utilizando uma interface desenvolvida especificamente para essa finalidade.

Entre as funções previstas para o caixa estão:

* Abrir o caixa no início do turno;
* Informar o valor inicial;
* Registrar vendas;
* Buscar produtos rapidamente;
* Utilizar leitor de código de barras;
* Adicionar e remover produtos;
* Alterar quantidades;
* Aplicar descontos;
* Cancelar itens;
* Cancelar vendas;
* Trabalhar com diferentes formas de pagamento;
* Realizar pagamentos mistos;
* Calcular troco automaticamente;
* Reimprimir comprovantes;
* Consultar o histórico das próprias vendas;
* Realizar sangrias;
* Realizar suprimentos;
* Fechar o caixa;
* Conferir o dinheiro;
* Comparar o valor esperado com o valor contado.

O fechamento do caixa também pode registrar eventuais diferenças entre o valor esperado pelo sistema e o valor informado pelo operador.

As vendas ficam relacionadas aos produtos cadastrados, ao funcionário responsável e ao caixa utilizado.

***

## Clientes

O SistemaSerra poderá possuir um cadastro opcional de clientes.

O objetivo não é obrigar o operador a cadastrar um cliente em todas as vendas. Uma venda pode ser realizada normalmente sem identificar o comprador.

Quando necessário, o cliente poderá ser associado à venda.

As informações previstas incluem:

* Nome;
* Telefone;
* E-mail;
* CPF, quando necessário;
* Histórico de compras;
* Produtos comprados;
* Total gasto;
* Última compra;
* Observações;
* Situação do cadastro.

Assim, uma venda poderá aparecer, por exemplo, como:

> **Venda → Cliente não identificado**

ou:

> **Venda → João da Silva**

***

## Produtos e estoque

O SistemaSerra possui um sistema de **cadastro e gerenciamento de produtos**.

Cada produto pode possuir informações como:

* Nome;
* Descrição;
* Categoria;
* Marca;
* Código interno;
* Código de barras;
* Unidade de medida;
* Preço de custo;
* Preço de venda;
* Quantidade disponível;
* Estoque mínimo;
* Estoque máximo;
* Fornecedor;
* Foto;
* Observações;
* Produtos relacionados.

O controle de estoque permite acompanhar a quantidade disponível de cada produto e relacionar essas informações às operações realizadas no estabelecimento.

Entre as funções previstas estão:

* Entrada de mercadorias;
* Saída manual;
* Ajuste de estoque;
* Inventário;
* Transferência de estoque;
* Registro de perdas;
* Registro de produtos vencidos;
* Histórico de movimentações;
* Identificação de produtos com estoque baixo;
* Identificação de produtos sem estoque;
* Desativação de produtos.

Dessa maneira, o estoque deixa de ser apenas uma lista de produtos e passa a fazer parte do funcionamento geral do sistema.

***

## Compras e reposição

O módulo de compras será relacionado principalmente ao **estoque e aos fornecedores**.

Entre as funções previstas estão:

* Cadastro de pedidos de compra;
* Lista de produtos que precisam de reposição;
* Sugestão de reposição;
* Definição da quantidade desejada;
* Fornecedor preferencial;
* Cotação de produtos;
* Histórico de compras;
* Recebimento de mercadorias;
* Conferência entre pedido e mercadoria recebida;
* Atualização do estoque após o recebimento;
* Registro do custo de aquisição;
* Histórico de alterações no preço de custo.

Dessa forma, o SistemaSerra poderá acompanhar o ciclo completo de um produto, desde sua compra até sua entrada no estoque e posterior venda.

***

## Fornecedores

O sistema também terá uma área específica para fornecedores.

Cada fornecedor poderá possuir informações como:

* Nome;
* CNPJ ou outra identificação;
* Contatos;
* Produtos fornecidos;
* Histórico de compras;
* Preços de compra;
* Última compra;
* Pedidos de reposição.

Os fornecedores estarão relacionados aos produtos e ao módulo de compras.

***

## Funcionários

O SistemaSerra terá uma área específica para gerenciamento de funcionários.

As informações poderão incluir:

* Nome;
* Identificação;
* Cargo;
* Crachá;
* Chave administrativa;
* Permissões;
* Situação do funcionário;
* Histórico de acesso;
* Histórico de operações;
* Turnos;
* Registro de entrada e saída.

O administrador poderá definir as permissões de cada funcionário de acordo com sua função.

***

## Sistema de permissões

As permissões poderão ser controladas de forma detalhada.

Em vez de simplesmente definir que determinado cargo possui acesso completo a um módulo, será possível determinar funções específicas.

Por exemplo:

### Permissões — Gerente

* ✓ Ver vendas
* ✓ Ver estoque
* ✓ Alterar produtos
* ✓ Criar funcionários
* ✓ Ver relatórios
* ✗ Alterar configurações técnicas
* ✗ Restaurar banco de dados

Isso permite que o administrador tenha maior controle sobre o que cada funcionário pode fazer dentro do sistema.

***

## Painel do gerente

O gerente terá acesso a um painel geral com informações importantes sobre o funcionamento do estabelecimento.

Entre as informações previstas estão:

* Vendas do dia;
* Vendas por caixa;
* Vendas por funcionário;
* Produtos mais vendidos;
* Produtos menos vendidos;
* Faturamento;
* Quantidade de vendas;
* Formas de pagamento utilizadas;
* Produtos com estoque baixo;
* Movimentações recentes;
* Caixas abertos;
* Caixas fechados;
* Funcionários conectados.

Um exemplo simplificado da interface seria:

```
SISTEMASERRA

VENDAS HOJE
R$ 4.827,50

VENDAS
127

CAIXAS
3 online

ESTOQUE
12 produtos com estoque baixo

ÚLTIMAS OPERAÇÕES
13:42  Caixa 02  Venda #1842
13:41  Caixa 01  Venda #1841
13:39  Estoque   Entrada #093

```

O conteúdo apresentado poderá variar de acordo com o cargo e as permissões do usuário.

***

## Relatórios

O SistemaSerra terá um módulo de relatórios para consultar informações do estabelecimento.

Entre os relatórios previstos estão:

* Relatório diário;
* Relatório semanal;
* Relatório mensal;
* Vendas por período;
* Vendas por funcionário;
* Vendas por produto;
* Relatório de estoque;
* Movimentações de estoque;
* Produtos mais vendidos;
* Produtos com baixa movimentação;
* Fluxo de caixa;
* Cancelamentos;
* Descontos concedidos.

***

## Histórico geral

Além dos relatórios, o sistema terá um **histórico geral das operações**.

Esse histórico servirá para registrar ações importantes realizadas dentro do SistemaSerra.

Por exemplo:

```
19/08/2026 13:42

Operador: João
Máquina: Caixa 02
Ação: Venda realizada
Venda: #1842
Valor: R$ 37,90

```

Outro exemplo:

```
19/08/2026 13:45

Gerente: Carlos
Máquina: Gerência
Ação: Alteração de preço
Produto: Arroz 5kg
R$ 25,90 → R$ 27,50

```

O histórico poderá ser utilizado para acompanhar operações, investigar alterações e auxiliar na administração do sistema.

***

## Notificações e alertas

O SistemaSerra poderá possuir uma central de notificações.

Entre os alertas previstos estão:

* Estoque baixo;
* Produto sem estoque;
* Produto próximo do vencimento;
* Caixa aberto por muito tempo;
* Diferença no fechamento;
* Falha de sincronização;
* Máquina desconectada;
* Nova entrada de estoque;
* Nova operação importante.

As notificações poderão ser direcionadas de acordo com o cargo e as permissões do usuário.

***

## Comunicação entre funcionários

O SistemaSerra poderá possuir uma comunicação interna simples para operações do estabelecimento.

O objetivo não é transformar o sistema em um aplicativo de mensagens completo, mas permitir pequenas comunicações entre funcionários.

Por exemplo:

> **Gerente → Estoque**

> Separar 20 unidades do produto X.

Ou:

> **Estoquista → Gerente**

> Produto Y está esgotado.

Essa função poderá ser integrada às notificações do sistema.

***

## Sincronização entre máquinas

Uma das características fundamentais do SistemaSerra é a **sincronização entre as diferentes máquinas utilizadas no estabelecimento**.

O sistema poderá estar instalado em vários computadores, mas essas instalações não funcionarão como sistemas completamente independentes. Elas farão parte de uma mesma estrutura e compartilharão as informações necessárias.

Por exemplo, um estabelecimento poderá possuir:

* Um computador para o gerente;
* Um computador para cada caixa;
* Um computador para o estoque;
* Um computador para o vendedor.

Cada máquina terá sua própria interface e suas próprias funções, mas todas trabalharão com os mesmos dados do estabelecimento.

Quando um operador realizar uma venda no Caixa 01, por exemplo, a operação deverá ser registrada na estrutura compartilhada do SistemaSerra.

Essa informação poderá então ser utilizada por outras partes do sistema que tenham permissão para acessá-la.

O funcionamento poderá ser representado da seguinte maneira:

```
Caixa 01
→ realiza uma venda
→ envia a operação
→ venda é registrada
→ estoque é atualizado

Caixa 02
→ realiza outra venda
→ envia a operação
→ sistema registra a venda

Computador do gerente
→ recebe as informações
→ acompanha vendas e operações

Computador do estoque
→ recebe as alterações
→ acompanha as quantidades disponíveis

```

A sincronização também deverá evitar que as diferentes máquinas trabalhem com informações desatualizadas.

A arquitetura definitiva da comunicação entre as máquinas ainda poderá ser definida conforme o desenvolvimento do projeto. A estrutura poderá possuir um serviço responsável pela comunicação e sincronização, enquanto as diferentes instalações do SistemaSerra atuarão como clientes.

O SQLite continuará sendo utilizado como parte do armazenamento do sistema, enquanto a comunicação entre as máquinas será responsável pela sincronização das informações.

A intenção é que o estabelecimento possua **uma única estrutura lógica de dados**, acessada por diferentes máquinas.

***

## Status da sincronização

Cada máquina poderá apresentar o estado atual da conexão com o sistema.

Por exemplo:

```
● Sistema sincronizado

```

```
● Sincronizando...

```

ou:

```
● Sem conexão

```

Também poderão ser exibidas informações como:

* Última sincronização;
* Serviço conectado;
* Número de máquinas conectadas;
* Caixas online;
* Alterações pendentes;
* Erros de sincronização.

Uma tela de máquinas conectadas poderá mostrar:

```
SISTEMAS CONECTADOS

Gerência       ● Online
Caixa 01       ● Online
Caixa 02       ● Online
Estoque        ● Online

```

Ao selecionar uma máquina:

```
CAIXA 02

Status: Online
Usuário: João
Cargo: Operador
Última sincronização: 13:47:21
Versão: 0.4.2
Operações pendentes: 0

```

***

## Modo offline

O SistemaSerra também poderá possuir um **Modo Offline**.

Se um computador perder temporariamente a conexão com o restante do sistema, operações que possam ser realizadas localmente poderão continuar funcionando.

Por exemplo:

```
● SEM CONEXÃO

O SistemaSerra está funcionando offline.

Vendas realizadas: 3
Operações pendentes: 3

```

Quando a conexão voltar, as operações pendentes poderão ser sincronizadas:

```
● SINCRONIZANDO...

3 operações encontradas.

✓ Venda #1843
✓ Venda #1844
✓ Venda #1845

```

Essa função será especialmente importante para os caixas, pois uma falha temporária na rede não deverá necessariamente impedir o funcionamento do atendimento.

***

## Backup e restauração

O **Modo Administrador Técnico** terá funções relacionadas à manutenção do sistema.

Entre elas estão:

* Backup manual;
* Backup automático;
* Histórico de backups;
* Restauração;
* Exportação do banco de dados;
* Verificação de integridade;
* Backup local;
* Backup em outra máquina da rede;
* Diagnóstico do sistema;
* Consulta de logs;
* Manutenção;
* Configurações do serviço de sincronização.

O sistema também poderá apresentar informações como:

> **Último backup: hoje às 03:00**

***

## Gerenciamento das máquinas

O administrador poderá visualizar as máquinas conectadas ao SistemaSerra.

Por exemplo:

```
MÁQUINAS

Gerência       ONLINE
Caixa 01       ONLINE
Caixa 02       ONLINE
Caixa 03       OFFLINE
Estoque        ONLINE

```

Essa área permitirá acompanhar o estado das diferentes instalações e identificar problemas de conexão ou sincronização.

***

## Configurações do estabelecimento

O sistema terá uma área para as configurações gerais do estabelecimento.

Entre elas:

* Nome do estabelecimento;
* Logotipo;
* Endereço;
* Telefone;
* Dados fiscais, quando necessários;
* Moeda;
* Configurações de venda;
* Configurações de estoque;
* Configurações de caixa;
* Impressoras;
* Leitores de código de barras;
* Configurações de sincronização.

***

## Banco de dados

O **SQLite** será utilizado para o armazenamento estruturado das informações do SistemaSerra.

Entre os dados armazenados estarão:

* Produtos;
* Preços;
* Quantidades;
* Vendas;
* Funcionários;
* Cargos;
* Permissões;
* Clientes;
* Fornecedores;
* Compras;
* Movimentações;
* Configurações;
* Outras informações utilizadas pelo sistema.

O SQLite é uma parte importante da estrutura por ser leve e permitir que o sistema trabalhe com um banco de dados próprio sem exigir necessariamente um servidor de banco de dados tradicional.

A forma como os bancos locais participarão da sincronização entre as máquinas será definida conforme a arquitetura do sistema for desenvolvida.

***

## Linguagem de programação: Nim

O **Nim** é a principal linguagem utilizada no desenvolvimento do SistemaSerra.

A escolha do Nim está relacionada à proposta de utilizar uma linguagem compilada, eficiente e com características próximas às linguagens de baixo nível, mas que também oferece recursos modernos e uma sintaxe mais concisa.

O Nim será utilizado para desenvolver a lógica principal do sistema, trabalhar com estruturas de dados, acessar o SQLite, controlar as operações e implementar as regras de negócio.

O SistemaSerra também serve como um projeto prático para aprofundar o conhecimento em Nim, permitindo utilizar a linguagem em uma aplicação maior em vez de apenas em pequenos programas e testes.

***

## Interface com NimWeb

O **NimWeb** será utilizado para a construção da interface do SistemaSerra.

A ideia é utilizar tecnologias relacionadas à web para construir as interfaces, enquanto a lógica principal permanece integrada ao código desenvolvido em Nim.

Essa separação permite organizar melhor o projeto:

**Nim**

→ lógica da aplicação, processamento, regras de negócio, comunicação com o banco e funcionamento interno.

**NimWeb**

→ interface, telas e interação do usuário.

Dessa forma, diferentes áreas do SistemaSerra podem possuir interfaces próprias sem que seja necessário duplicar a lógica principal do sistema.

***

## Arquitetura da aplicação

A estrutura do SistemaSerra busca separar as diferentes responsabilidades do programa.

De forma simplificada, o sistema pode ser dividido em:

**Interface**

→ telas, menus, formulários, botões e interação do usuário.

**Lógica do sistema**

→ regras de negócio, permissões, autenticação e processamento das operações.

**Dados**

→ armazenamento e gerenciamento das informações através do SQLite.

**Comunicação e sincronização**

→ comunicação entre as diferentes máquinas e sincronização das informações compartilhadas.

Essa organização facilita a manutenção do projeto e permite adicionar novas funcionalidades sem precisar reconstruir toda a aplicação.

***

## Identidade visual

Além da parte funcional, o SistemaSerra possui uma **identidade visual própria**.

O projeto possui seu próprio nome, logotipo, ícones e organização visual.

A identidade visual também considera diferentes tamanhos e situações de uso, como:

* Ícone da aplicação;
* Barra de tarefas;
* Menus do sistema;
* Ícones de diferentes tamanhos;
* Elementos da interface.

A intenção é que o SistemaSerra tenha uma identidade reconhecível e consistente em todas as partes da aplicação.

***

## Desenvolvimento e documentação

O SistemaSerra também funciona como um projeto de aprendizado e desenvolvimento contínuo.

Durante sua construção são estudados conceitos como:

* Programação em Nim;
* NimWeb;
* SQLite;
* Bancos de dados relacionais;
* Desenvolvimento de interfaces;
* Autenticação;
* Controle de permissões;
* Sincronização;
* Comunicação entre máquinas;
* Arquitetura de software;
* Organização de projetos;
* Desenvolvimento de aplicações;
* Design de interfaces;
* Identidade visual;
* Documentação de software.

O **Zim** é utilizado como uma wiki pessoal para organizar informações, ideias e documentação relacionadas ao projeto.

***

## Filosofia do projeto

O SistemaSerra foi pensado para ser desenvolvido de forma gradual.

A ideia não é tentar criar imediatamente um sistema enorme com centenas de funções. O objetivo é construir primeiro uma base sólida e acrescentar funcionalidades conforme o projeto evolui.

Isso permite testar cada componente, corrigir problemas, reorganizar a arquitetura quando necessário e aprender com cada etapa do desenvolvimento.

O projeto também possui uma forte característica de **autonomia tecnológica**. A intenção é compreender como cada parte do sistema funciona e manter o controle sobre sua implementação, em vez de simplesmente depender de uma plataforma empresarial pronta.

Por isso, tecnologias como **Nim, NimWeb e SQLite** são importantes para o projeto.

***

## Objetivo final

O objetivo final do SistemaSerra é tornar-se um **sistema comercial completo e integrado**, capaz de administrar diferentes áreas de um estabelecimento através de uma única aplicação.

A estrutura do sistema será baseada em diferentes funções:

**Administrador**

→ controla o sistema, configurações, usuários, permissões e funções técnicas.

**Gerente**

→ acompanha e administra as operações do estabelecimento.

**Vendedor**

→ trabalha com as operações relacionadas às vendas e ao atendimento.

**Operador**

→ utiliza o Modo Operador para realizar as operações de caixa.

**Estoquista**

→ administra produtos, estoque e movimentações.

Todos esses usuários trabalham dentro do mesmo ecossistema, utilizando diferentes níveis de acesso e interfaces de acordo com suas funções.

No núcleo tecnológico, o SistemaSerra utiliza **Nim como linguagem principal**, **NimWeb para a construção das interfaces** e **SQLite para armazenamento dos dados**. A arquitetura também possui uma camada de comunicação e sincronização responsável por conectar as diferentes máquinas que utilizam o sistema.

Assim, o SistemaSerra é uma **aplicação de gestão comercial integrada**, uma plataforma para diferentes funcionários e, ao mesmo tempo, um grande projeto pessoal de desenvolvimento de software.

O projeto reúne **programação, banco de dados, interfaces, autenticação, controle de acesso, sincronização entre máquinas, administração, design e documentação** em uma única aplicação, com a intenção de evoluir continuamente até se tornar um sistema completo, funcional e com identidade própria.
