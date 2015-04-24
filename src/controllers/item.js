'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Mongoose = require('mongoose'),
  Item  = Mongoose.model('Item'),
  Jwt = require('jsonwebtoken');

var Config = require('../config/config');

exports.getAll = function getAll(request, reply) {
    Item.find({status:'available'}, function (err, items) {
      if (!err) {
        return reply(items);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

exports.getByTag = function getAll(request, reply) {
    Item.find({tag:request.params.tag}, function (err, items) {
      if (!err) {
        return reply(items);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

exports.getOne = function (request, reply) {
    Item.findOne({ _id: request.params.itemId }, function (err, item) {
      if (!err) {
        return reply(user);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

exports.create =  function (request, reply) {
  var item = new Item(request.payload);
  item.save(function (err, item) {
    if (!err) {
      return reply(item).created('/api/item/' + item._id); // HTTP 201
    }
    if (11000 === err.code || 11001 === err.code) {
      return reply(Boom.forbidden("please provide another user id, it already exist"));
    }
    return reply(Boom.forbidden(err)); // HTTP 403
  });
};

exports.update = function (request, reply) {
    User.findOne({ _id: request.params.itemId }, function (err, item) {
      if (!err) {
        item.title = request.payload.title;
        item.content = request.payload.content;
        item.price = request.payload.price;
        item.url = request.payload.url;
        item.status = request.payload.status;
        item.save(function (err, user) {
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
