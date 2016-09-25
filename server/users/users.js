'use strict';

const sha512 = require('sha512');

﻿module.exports = class {
    constructor (users) {
        this.users = users;
    }

    validateUser (username, password) {
        password = sha512(password).toString('hex');
        let f = this.users.filter((user) => {
            return user.username === username && user.password === password;
        });
        return f.length === 1;
    }

    getUserList() {
        return this.users.map((user) => {
            return user.username;
        });
    }
};
