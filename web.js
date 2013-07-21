var express = require('express');
var fs = require("fs");

var app = express.createServer(express.logger());

var configureAll = function(){
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
};

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    configureAll();
});

app.configure('production', function(){
    app.use(express.errorHandler());
    configureAll();
});

app.get('/', function(request, response) {


    fs.readFile("index.html", function (err, data) {
        if (err) throw err;
        response.send(data.toString());
    });


});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});