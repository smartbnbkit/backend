import Datastore = require("nedb");
import * as UserModel from "../models/user";

export class Service {
    db: Datastore;
    constructor() {
        this.db = new Datastore({filename: "./users.db", autoload: true});
    }
    signup(user: UserModel.Model): Promise<any> {
        return new Promise((resolve,reject) => {
                this.db.findOne({username: user.username}, (err,doc) => {
                    if (err) return reject(err);
                    if (doc) {
                        return reject("The user already exists.");
                    }
                    this.db.insert(user, (err,document) => {
                        if (err) {
                            return reject(err.message);
                        }
                        return resolve(true);
                    }
                );
            });
        });
    }
    login(username: string, password: string): Promise<UserModel.Model> {
        return new Promise<UserModel.Model>((resolve,reject) => this.db.findOne({
            username: username, password: password
        }, (err,document) => {
            if (err) {
                return reject(err.message);
            }
            else {
                if (document) {
                    return resolve(document as UserModel.Model);
                }
                return reject("Not found.");
            }
        }));
    };
};
