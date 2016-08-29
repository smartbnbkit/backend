"use strict";
const Datastore = require("nedb");
const shortid = require("shortid");
class Token {
}
exports.Token = Token;
;
class Service {
    constructor() {
        this.db = new Datastore({ filename: "./sessions.db", autoload: true });
    }
    acquire(username) {
        let token = new Token();
        token.__id = shortid.generate();
        token.username = username;
        this.db.insert(token);
        return token.__id;
    }
    retrieve(token) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ __id: token }, (err, document) => {
                if (err)
                    return reject(err.message);
                if (document) {
                    return resolve(document.username);
                }
                return reject("Token not found.");
            });
        });
    }
}
exports.Service = Service;
;
