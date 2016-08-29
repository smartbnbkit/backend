"use strict";

import express = require("express");
import bodyParser = require("body-parser");

import * as UserModel from "./models/user";

import * as Device from "./services/device";
import * as User from "./services/user";
import * as Session from "./services/session";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

let switch_status = true;

let user_service = new User.Service();
let session_service = new Session.Service();
let device_service = new Device.Service();

var router = express.Router();
router.post("/signup", (req,res) => {
    let user: UserModel.Model = { username: req.body.username, password: req.body.password };
    user_service.signup(user).then(() => res.json({success: user.username})).catch((reason) => res.json({error: reason}));
});
router.post('/login', function(req, res) {
    return user_service.login(req.body.username, req.body.password).then(user => 
    {
        let token = session_service.acquire(user.username);
        res.json({ token: token });
    })
    .catch(reason => res.json({ error: reason }));
});
router.post("/lost-password", function(req,res) {
    res.json({success: "An email will be sent to your address."});
});
router.get('/switch', function(req, res) {
    session_service.retrieve(req.query.token).then(user => res.json({ status: switch_status }))
    .catch(reason => res.json({error: reason}));
});
router.post('/switch', function(req, res) {
    session_service.retrieve(req.query.token).then(user => {
        switch_status = req.body.status;
        res.json({ status: switch_status });   
    })
    .catch(reason => res.json({error: reason}));
});
router.post("/history", function(req,res) {
    session_service.retrieve(req.query.token).then(user => {
        res.json({user: user,
            history: [
            { date: new Date(2016,8,1,10,10), status: {switch: true, presence: true} },
            { date: new Date(2016,8,1,10,16), status: {switch: true, presence: true} },
            { date: new Date(2016,8,1,10,30), status: {switch: false, presence: false} },
            { date: new Date(2016,8,1,11,10), status: {switch: false, presence: false} },
            { date: new Date(2016,8,1,11,16), status: {switch: true, presence: false} },
            { date: new Date(2016,8,1,15,22), status: {switch: true, presence: true} },
            { date: new Date(2016,8,1,15,30), status: {switch: true, presence: true} },
            { date: new Date(2016,8,1,15,35), status: {switch: false, presence: true} },
            { date: new Date(2016,8,1,15,55), status: {switch: true, presence: true} },
            ]});
    })
    .catch(reason => res.json({error: reason}));
});

app.use('/', router);
app.listen(port);
