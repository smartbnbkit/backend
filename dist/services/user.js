"use strict";
const Datastore = require("nedb");
class Service {
    constructor() {
        this.db = new Datastore({ filename: "./users.db", autoload: true });
    }
    signup(user) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ username: user.username }, (err, doc) => {
                if (err)
                    return reject(err);
                if (doc) {
                    return reject("The user already exists.");
                }
                this.db.insert(user, (err, document) => {
                    if (err) {
                        return reject(err.message);
                    }
                    return resolve(true);
                });
            });
        });
    }
    login(username, password) {
        return new Promise((resolve, reject) => this.db.findOne({
            username: username, password: password
        }, (err, document) => {
            if (err) {
                return reject(err.message);
            }
            else {
                if (document) {
                    return resolve(document);
                }
                return reject("Not found.");
            }
        }));
    }
    ;
}
exports.Service = Service;
;
