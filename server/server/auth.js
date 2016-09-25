'use strict';

let basicAuth = require('basic-auth'),

unauthorised = (res) => {
    try {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    }
    catch (e) {}
    return res.sendStatus(401);
};

exports.basicUsers = (userManager, ignoredAuthConfig) => {
    return function(req, res, next) {
        let ip = req.ip;
        if (ip.includes(':')) {
            ip = ip.substring(ip.lastIndexOf(':') + 1);
            if (ip === "1") {
                ip = '127.0.0.1';
            }
        }
        req.ipv4 = ip;
        let user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorised(res);
        };

        if (userManager.validateUser(user.name, user.pass)) {
            req.authorizedUser = user.name;
            return next();
        }
        return unauthorised(res);
    };
};
