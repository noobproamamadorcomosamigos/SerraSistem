(function () {
    function enviarErro(mensagem) {
        console.error(mensagem);

        if (window.backend && typeof window.backend.frontendError === 'function') {
            window.backend.frontendError(mensagem);
        }
    }

    window.addEventListener('error', function (event) {
        var local = event.filename
            ? ' (' + event.filename + ':' + event.lineno + ':' + event.colno + ')'
            : '';
        enviarErro('[JavaScript] ' + event.message + local);
    });

    window.addEventListener('unhandledrejection', function (event) {
        var motivo = event.reason instanceof Error ? event.reason.stack : String(event.reason);
        enviarErro('[Promise] ' + motivo);
    });
})();
