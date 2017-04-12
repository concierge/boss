'use strict';

const Server = require('./server/server/serve.js'),
	UserManager = require('./server/users/users.js'),
    BossMockIntegration = require('./BossMockIntegration.js'),
    admin = require('ng2-admin'),
    files = require('concierge/files'),
	path = require('path'),
    fs = require('fs');
let _serve = null,
    loaderEvents = {},
    unhandledErrors = [];

const onUnhandledError = (err, blame, api, event) => {
    const errObj = {
        error: err.stack || err,
        blame: blame,
        event: event,
        datetime: (new Date()).toISOString()
    };
    if (!errObj.event) {
        errObj.event = shim.createEvent(-1, -1, '<unknown>', '<none>');
        errObj.event.event_source = '<none>';
    }
    unhandledErrors.push(errObj);
    _serve.emitToClient('unhandledError', errObj);
};

exports.load = () => {
    exports.config.port = exports.config.port || 8080;
    exports.config.auth = exports.config.auth || [ // admin:admin
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

	const userManager = new UserManager(exports.config);
	_serve = new Server(exports.config.port, userManager, {
        '/node_modules/': npmPath,
        '/@angular/': path.join(npmPath, '@angular'),
        '_default_': path.join(exports.__descriptor.folderPath, 'www')
    }, '/bossEvents');

    _serve.on('connection', socket => {
        socket._integration = new BossMockIntegration(socket, exports.platform.onMessage.bind(exports.platform));
    });

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

    const loaderEvents = ['load', 'unload', 'start', 'stop'];
    const em = (name, data) => {
        try {
            let desc = data.__descriptor;
            if (data.module) {
                if (data.module.__descriptor)
                    desc = data.module.__descriptor;
                else
                    desc = data.module;
            }
            else if (!desc)
                desc = data;
            _serve.emitToClient(`loader_${name}`, desc);
        }
        catch (e) {}
    }
    for (let ev of loaderEvents) {
        const before = em.bind(this, ev);
        const after = em.bind(this, `pre${ev}`);
        exports.platform.modulesLoader.on(ev, before);
        exports.platform.modulesLoader.on(`pre${ev}`, after);
        loaderEvents[ev] = before;
        loaderEvents[`pre${ev}`] = after;
    }

    exports.platform.on('uncaughtError', onUnhandledError);
    _serve.on('allUnhandledErrors', socket => {
        socket.emit('allUnhandledErrors', unhandledErrors);
    });

    _serve.on('user_list', socket => {
        socket.emit('user_list', userManager.getUserList());
    });

    _serve.on('user_delete', (socket, data) => {
        userManager.deleteUser(data[0]);
    });

    _serve.on('user_update', (socket, data) => {
        userManager.updateUser(data[0].username, data[0].password);
    });

    _serve.on('module_config', (socket, data) => {
        const config = exports.platform.config.loadConfig({
            name: data[0],
            type: [],
            force: true
        });
        socket.emit('module_config', config);
    });

    _serve.on('module_newconfig', (socket, data) => {
        const cfg = exports.platform.config.loadConfig({
            name: data[0],
            type: [],
            force: true
        });

        const inputData = data[1];
        if (typeof(inputData) !== 'object' || Array.isArray(inputData)) {
            return;
        }

        for (let key in cfg) {
            if (!inputData.hasOwnProperty(key)) {
                delete cfg[key];
            }
        }
        for (let key in inputData) {
            if (inputData.hasOwnProperty(key)) {
                cfg[key] = inputData[key];
            }
        }

        for (let key of Object.keys(cfg)) {
            if (key.startsWith('ENV_') && key === key.toUpperCase()) {
                process.env[key.substr(4)] = cfg[key];
            }
        }
    });

    _serve.on('unloaded_modules', socket => {
        const folders = exports.platform.modulesLoader.getLoadedModules()
            .map(m => path.basename(m.__descriptor.folderPath));
        const data = files.filesInDirectory(global.__modulesPath);
        const unloadedModules = [];
        for (let folder of data) {
            if (!folders.includes(folder))
                unloadedModules.push(folder);
        }
        socket.emit('unloaded_modules', unloadedModules);
    });

    _serve.start();
};

exports.unload = () => {
    exports.platform.removeListener('uncaughtError', onUnhandledError);
    unhandledErrors = [];
    for (let ev in loaderEvents) {
        exports.platform.modulesLoader.removeListener(ev, loaderEvents[ev]);
        delete loaderEvents[ev];
    }
	_serve.stop();
};
