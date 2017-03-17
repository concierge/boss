(global => {
    System.config({
        baseURL: 'node_modules',
        packageConfigPaths: [
            'node_modules/*/package.json'
        ],
        map: {
            '@angular/core': '@angular/core/bundles/core.umd.js',
            '@angular/common': '@angular/common/bundles/common.umd.js',
            '@angular/compiler': '@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': '@angular/http/bundles/http.umd.js',
            '@angular/router': '@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade': '@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': '@angular/forms/bundles/forms.umd.js',
            'socket.io-client': 'socket.io-client/dist/socket.io.js'
        },
        meta: {
            '*.css': {
                format: 'global',
                loader: 'systemjs-plugin-css'
            },
            '*.json': {
                format: 'global'
            }
        },
        packages: {
            rxjs: {
                defaultExtension: 'js'
            },
            'socket.io-client': {
                defaultExtension: 'js'
            },
            'ng2-jsoneditor': {
                main: 'index.js'
            },
            jsoneditor: {
                main: './dist/jsoneditor.min.js'
            },
            'systemjs-plugin-css': {
                main: 'css.js'
            }
        }
    });
})(this);
