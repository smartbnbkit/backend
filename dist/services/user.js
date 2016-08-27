"use strict";
const Datastore = require("nedb");
class Model {
}
exports.Model = Model;
;
class Service {
    constructor() {
        this.db = new Datastore({ filename: "./users.db", autoload: true });
    }
    signup(user) {
        return new Promise((resolve, reject) => this.db.insert(user, (err, document) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        }));
    }
    ;
    login(username, password) {
        return new Promise((resolve, reject) => this.db.findOne({
            username: username, password: password
        }, (err, document) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(document);
            }
        }));
    }
    ;
}
exports.Service = Service;
;
