'use strict';

﻿const fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
	url = require('url');

exports.dir = htmlRoots => {
    return (req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.header("X-Powered-By", "Knoxius-Servius");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let p = url.parse(req.url).path;
        if (p.indexOf("/api") < 0) {
            if (p === "/") {
                p = "/index.html";
            }

            let htmlRoot = null;
            for (let key in htmlRoots) {
                if (key === '_default_') {
                    continue;
                }
                if (p.startsWith(key)) {
                    htmlRoot = htmlRoots[key];
                    p = p.substr(key.length);
                    break;
                }
            }
            if (htmlRoot === null) {
                htmlRoot = htmlRoots['_default_'];
            }

            let found = false,
                file = path.resolve(path.join(htmlRoot, p));

            if (!file.startsWith(htmlRoot)) {
                res.contentType("application/json");
                res.status(400).send('{"complete":false, "message":"bad request"}');
                return;
            }
            let type = mime.lookup(file);
            fs.readFile(file, function(err, data) {
                if (err) {
                    fs.readFile(path.join(htmlRoot, '404.html'), (err, data) => {
                        if (err) {
                            res.contentType("application/json");
                            res.status(404).send('{"complete":false, "message":"file not found"}');
                        } else {
                            res.status(404);
                            res.contentType("text/html");
                            res.send(data);
                        }
                    });

                    return;
                }
                res.contentType(type);
                res.send(data);
            });
        } else {
            next();
        }
    };
};
