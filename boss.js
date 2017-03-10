'use strict';

const Server = require('./server/server/serve.js'),
	UserManager = require('./server/users/users.js'),
	path = require('path'),
    fs = require('fs');
let _serve = null;

exports.load = () => {
	let port = exports.config.port || 8080,
		users = exports.config.auth || [ // admin:admin
			{
				"username": "admin",
				"password": "c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec"
			}
		];

    let npmPath;
    try {
        const p = path.join(exports.__descriptor.folderPath, 'node_modules');
        if (!fs.statSync(p).isDirectory())
            throw new Error();
        npmPath = p;
    }
    catch(e) {
        npmPath = global.rootPathJoin('node_modules');
    }

	let userManager = new UserManager(users);
	_serve = new Server(port, userManager, {
        '/node_modules/': npmPath,
        '_default_': path.join(exports.__descriptor.folderPath, 'www')
    }, '/bossEvents');

    _serve.on('allModules', socket => {
        const modules = [];
		for (let mod of exports.platform.modulesLoader.getLoadedModules()) {
			modules.push(mod.__descriptor);
		}
        socket.emit('allModules', modules);
    });

    _serve.on('allLoaders', socket => {
        const loaders = [];
        for (let loader of exports.platform.modulesLoader._loaderPaths) {
            const name = loader.split('/')[1];
            loaders.push({
                name: name
            });
        }
        socket.emit('allLoaders', loaders);
    });

    _serve.start();
};

exports.unload = () => {
	_serve.stop();
};
