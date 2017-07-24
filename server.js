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

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// =======================
// router
// =======================
var faqRoutes = require('./routes/api/faq/index');
app.use('/api', faqRoutes);

var sampleRoutes = require('./routes/sample_chat/index');
app.use('/sample', sampleRoutes);

// =======================
// start the server
// =======================
var port = process.env.PORT || 8080;
app.listen(port);
console.log('started http://localhost:' + port + '/');

