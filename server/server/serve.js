'use strict';

const express = require('express'),
    socketio = require('socket.io'),
    http = require('http'),
    bodyParser = require('body-parser'),
    auth = require('./auth.js'),
    directory = require('./directory.js'),
    EventEmitter = require('events');

module.exports = class extends EventEmitter {

    constructor (port, userManager, htmlRoots, eventsRoot) {
        super();
        this.serverPort = port;
        this.express = express();
        this.server = http.Server(this.express);

        const authMiddleware = auth.basicUsers(userManager);

        if (eventsRoot !== null && eventsRoot !== '') {
            this.io = socketio(this.server, { path: eventsRoot });
            this.io.use(function (socket, next) {
                socket.request.ip = socket.handshake.address;
                authMiddleware(socket.request, socket.request.res, next);
            });

            const self = this;
            this.io.on('connection', socket => {
                self.emit('connection', socket);

                const oldRun = socket.run;
                socket.run = function(event, fn) {
                    return oldRun.call(this, event, function(err) {
                        const res = fn.apply(this, res);
                        process.nextTick(function(){
                            if (err) {
                                return;
                            }
                            const ev = event.slice();
                            ev.splice(1, 0, socket);
                            self.emit.apply(self, ev);
                        }.bind(this));
                        return res;
                    });
                };

                socket.on('disconnect', () => {
                    socket.removeAllListeners();
                });
            });
        }

        this.express.use(bodyParser.json());
        this.express.use(authMiddleware);
        this.express.use(directory.dir(htmlRoots));
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

    use (middleware) {
        this.express.use(middleware);
    }

    apiGet (api, func) {
        this._handleApiCall.call(this.express, this.express.get, api, func);
    }

    apiPost (api, func) {
        this._handleApiCall.call(this.express, this.express.post, api, func);
    }

    emitToClient (name, data) {
        this.io.emit(name, data);
    }

    start () {
        this.server.listen(this.serverPort);
    }

    stop() {
        this.removeAllListeners();
        this.server.close();
    }
}
