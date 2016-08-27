import Datastore = require("nedb");

export class Model {
    username: string;
    password: string;
};

export class Service {
    db: Datastore;
    constructor() {
        this.db = new Datastore({filename: "./users.db", autoload: true});
    }
    signup(user: Model): Promise<any> {
        return new Promise((resolve,reject) => this.db.insert(user, (err,document) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        }));
    };
    login(username: string, password: string): Promise<Model> {
        return new Promise<Model>((resolve,reject) => this.db.findOne({
            username: username, password: password
        }, (err,document) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(document as Model);
            }
        }));
    };
};
