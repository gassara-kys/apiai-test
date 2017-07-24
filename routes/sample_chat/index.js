'use strict'

var express = require('express');
var path = require('path');

/**
 * Router
 */
var sampleRoutes = express.Router();

/**
 * samlp html返すだけ。
 */
// POST(http://localhost:8080/sample/)
sampleRoutes.get('/', function(req, res) {
    res.sendFile(path.resolve('views/sample_chat/index.html'));
});

module.exports = sampleRoutes;