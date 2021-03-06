var express = require("express");
var bodyParser = require("body-parser");
var mainRouter = require("./routes/routes.js");
var helmet = require('helmet');
var app = express();
//app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', mainRouter);
var server = app.listen(3031, function () {
    console.log("Running On Port " + server.address().port);
});
