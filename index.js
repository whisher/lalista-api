"use strict";

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

var Config = require('./src/config/config');
var Db = require('./src/config/db')(Config);
var app = {};
app.config = Config;

var fs = require('fs');
var modelsPath = app.config.root+ '/src/models';
fs.readdirSync(modelsPath).forEach(function (file) {
	require(modelsPath + '/' + file);
});

var Hapi = require('hapi'),
  Jwt = require('hapi-auth-jwt'),
 Routes = require('./src/routes');




var server = new Hapi.Server();

server.connection(
  { 
    port: app.config.server.port,
    routes: {
      cors: true
    } 
  }
);

var validate = function (decodedToken, callback) {
console.log(decodedToken);
    var error,
        credentials =  {};

    if (!credentials) {
        return callback(error, false, credentials);
    }

    return callback(error, true, credentials)
};
server.register(Jwt, function (error) {

    server.auth.strategy('token', 'jwt', {
        key: app.config.key.apiSecret,
        validateFunc: validate
    });

    // Add all the routes within the routes folder
for (var route in Routes) {
  server.route(Routes[route]);
}
});


var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' ,error: '*' ,request: '*' }
    }]
};

server.register({
    register: require('good'),
    options: options
}, function (err) {

    if (err) {
        console.error(err);
    }
    else {
        server.start(function () {

            console.info('Server started at ' + server.info.uri);
        });
    }
});


/*
validate: {
    payload: {
      userId   : Joi.string().required(),
      username  : Joi.string().required()
    }
  },validate: {
    payload: {
      username  : Joi.string().required()
    }
  },
*/