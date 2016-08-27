"use strict";

import express = require("express");
import bodyParser = require("body-parser");

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
    let user: User.Model = { username: req.body.username, password: req.body.password };
    user_service.signup(user).then(() => res.json(true)).catch(() => res.json(false));
});
router.post('/login', function(req, res) {
    res.json({ token: 'youmadeit' });
});
router.get('/switch', function(req, res) {
    res.json({ status: switch_status });   
});
router.post('/switch', function(req, res) {
    switch_status = req.body.status;
    res.json({ status: switch_status });   
});

app.use('/', router);
app.listen(port);
