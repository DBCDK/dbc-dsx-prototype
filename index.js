// Convert es6 to es5
require("babel/register");

require('newrelic');
var newRelicHSHeader = require('./newrelic_config').dsx.js_header;
var express = require('express');
var io = require('socket.io');
var path = require('path');
var exphbs = require('express-handlebars');
var app = express();
var server = require('http').Server(app);
var socket = io(server);
var services = require('dbc-node-services');
var routes = require('./routes/routes');

//var authentication = require('./lib/authentication/authentication');

// Setup express env
app.set('port', process.env.PORT || 3000);

//Initialize api
services.init(socket);

// Setup view engine
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    newRelicJSHeader: newRelicHSHeader
  }
});
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup routing
app.use('/', express.static(__dirname + '/public'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/', express.static(__dirname + '/static'));
app.use('/', routes);

// Startup server
server.listen(app.get('port'), function() {
  console.log('Server listening on ' + app.get('port'));
  console.log('Versions: ', process.versions);
});

