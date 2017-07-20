'use strinct'
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// =======================
// Middle ware
// =======================
// config for body-parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// =======================
// router
// =======================
var faqRoutes = require('./app/api/faq/index');
app.use('/api', faqRoutes);


// =======================
// start the server
// =======================
var port = process.env.PORT || 8080;
app.listen(port);
console.log('started http://localhost:' + port + '/');

