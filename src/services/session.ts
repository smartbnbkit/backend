import Datastore = require("nedb");
import shortid = require("shortid");

export class Token {
    __id        : string;
    username    : string;
    expiration  : Date;
};

export class Service {
    db: Datastore;
    constructor() {
        this.db = new Datastore({filename: "./sessions.db", autoload: true});
    }
    acquire(username: string): string {
        let token = new Token();
        token.__id = shortid.generate();
        token.username = username;
        this.db.insert(token);
        return token.__id;
    }
    retrieve(token: string): Promise<string> {
        return new Promise((resolve,reject) => {
            this.db.findOne({__id: token}, (err,document: Token) => {
                if (err)
                    return reject(err.message);
                if (document) {
                    return resolve(document.username);
                }
                return reject("Token not found.");
            });
        });
    }
};
