'use strict';

let express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    auth = require('./auth.js'),
    directory = require('./directory.js');

module.exports = class {

    constructor (port, userManager, htmlRoot) {
        this.serverPort = port;
        this.express = express();
        this.server = http.Server(this.express);

        let authMiddleware = auth.basicUsers(userManager);
        this.express.use(bodyParser.json());
        this.express.use(authMiddleware);
        this.express.use(directory.dir(htmlRoot));
    }

    _handleApiCall (serverCall, api, func) {
        serverCall.call(this, '/api/' + api, function (req, res) {
            try {
                res.contentType("application/json");
                if (func(req, res)) {
                    res.status(200).send({
                        complete: true
                    });
                }
            }
		    catch (e) {
                console.error('Serve|ERR|' + e.message || e.stack || e);
                res.status(400).send({
                    complete: false,
                    message: e.message || 'An unknown error occurred.'
                });
            }
        });
    }

    apiGet (api, func) {
        this._handleApiCall.call(this.express, this.express.get, api, func);
    }

    apiPost (api, func) {
        this._handleApiCall.call(this.express, this.express.post, api, func);
    }

    start () {
        this.server.listen(this.serverPort);
    }

    stop() {
        this.server.close();
    }
}
