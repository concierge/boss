'use strict';

const Server = require('./server/server/serve.js'),
	UserManager = require('./server/users/users.js'),
	path = require('path');
let _serve = null;

exports.load = () => {
	let port = exports.config.port || 8080,
		users = exports.config.auth || [ // admin:admin
			{
				"username": "admin",
				"password": "c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec"
			}
		];

	let userManager = new UserManager(users);
	_serve = new Server(port, userManager, path.join(exports.__folderPath, 'www'));
	_serve.start();

	_serve.apiGet('modules', (req, res) => {
		let loaded = exports.platform.modulesLoader.getLoadedModules(),
			modules = [];
		for (let mod of loaded) {
			modules.push(mod.name);
		}
		res.send({
			modules: modules,
			success: true
		});
	});
};

exports.unload = () => {
	_serve.stop();
};

exports.match = () => false;
