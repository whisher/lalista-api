'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Mongoose = require('mongoose'),
  User  = Mongoose.model('User'),
  Jwt = require('jsonwebtoken');

var Config = require('../config/config');


exports.getAll = function getAll(request, reply) {
    User.find({}, function (err, users) {
      if (!err) {
        return reply(users);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

exports.getOne = function (request, reply) {
    User.findOne({ 'userId': request.params.userId }, function (err, user) {
      if (!err) {
        return reply(user);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

exports.create =  function (request, reply) {
  var user = new User(request.payload);
  user.save(function (err, user) {
    if (!err) {
      var userData = {
        username:user.username,
        scope: [user.scope],
        iss: Config.app.name,
        jti: user._id,
      };
      var res = {
        token : Jwt.sign(userData, Config.key.apiSecret, { expiresInMinutes: Config.key.expiresInMinutes})
      };
      return reply(res).created('/api/user/' + user._id); // HTTP 201
    }
    if (11000 === err.code || 11001 === err.code) {
      return reply(Boom.forbidden("please provide another user id, it already exist"));
    }
    return reply(Boom.forbidden(err)); // HTTP 403
  });
};

exports.auth =  function (request, reply) {
  var payload = request.payload;
  console.log(payload);
  User.isUser(payload, function(err, user) {
    if (!err){
      if(user){
        if(user.authenticate(payload.password)){
            var userData = {
              username:user.username,
              scope: [user.scope],
              iss: Config.app.name,
              jti: user._id,
            };
            var res = {
              token :Jwt.sign(userData, Config.key.apiSecret, { expiresInMinutes: Config.key.expiresInMinutes})
            };
            return reply(res);
        } 
        return reply(Boom.forbidden('invalid password'));   
      }
      return reply(Boom.forbidden('invalid username or email'));
    }
    return reply(Boom.badImplementation(err)); // 500 error 
  });
};

exports.logout =  function (request, reply) {
  reply('ok');
};
exports.update = function (request, reply) {
    User.findOne({ 'userId': request.params.userId }, function (err, user) {
      if (!err) {
        user.username = request.payload.username;
        user.save(function (err, user) {
          if (!err) {
            return reply(user); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another user id, it already exist"));
          }
          return reply(Boom.forbidden(err)); // HTTP 403
        });
      }
      else{ 
        return reply(Boom.badImplementation(err)); // 500 error
      }
    });
};

exports.remove = function (request, reply) {
    User.findOne({ 'userId': request.params.userId }, function (err, user) {
      if (!err && user) {
        user.remove();
        return reply({ message: "User deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete user"));
    });
};

exports.removeAll = function (request, reply) {
    mongoose.connection.db.dropCollection('users', function (err, result) {
      if (!err) {
        return reply({ message: "User database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete user"));
    });
};
