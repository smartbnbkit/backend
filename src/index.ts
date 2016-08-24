"use strict";

import express = require("express");
import bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

let switch_status = true;

var router = express.Router();
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
