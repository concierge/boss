'use strict';

const sha512 = require('sha512');

﻿module.exports = class {
    constructor (cfg) {
        this.users = cfg.auth;
    }

    validateUser(username, password) {
        password = sha512(password).toString('hex');
        const f = this.users.filter(user => {
            return user.username === username && user.password === password;
        });
        return f.length === 1;
    }

    getUserList() {
        return this.users.map(user => user.username);
    }

    deleteUser(username) {
        const index = this.users.findIndex(u => u.username === username);
        if (index < 0)
            return;
        this.users.splice(index, 1);
    }

    updateUser(username, password) {
        password = sha512(password).toString('hex');
        const index = this.users.findIndex(u => u.username === username);
        if (index < 0) {
            this.users.push({
                username: username,
                password: password
            });
        }
        else {
            this.users[index].password = password;
        }
    }
};
