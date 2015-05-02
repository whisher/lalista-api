'use strict';

var _ = require('lodash'),
  Boom = require('boom'),
  Config = require('../config/config'),
  Mongoose = require('mongoose'),
  Order  = Mongoose.model('Order');



exports.getAll = function getAll(request, reply) {
    Order.find({}, function (err, orders) {
      if (!err) {
        return reply(orders);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

exports.getOne = function (request, reply) {
    Order.findOne({ _id: request.params.orderId }, function (err, order) {
      if (!err) {
        return reply(order);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

exports.create =  function (request, reply) {
  var order = new Order(request.payload);
  order.save(function (err, item) {
    if (!err) {
      return reply(item).created('/api/order/' + item._id); // HTTP 201
    }
    return reply(Boom.forbidden(err)); // HTTP 403
  });
};

exports.update = function (request, reply) {
  Order.findOne({ _id: request.params.orderId }, function (err, order) {
    if (!err) {
      order.save(function (err, order) {
        if (!err) {
          return reply(order); // HTTP 201
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
    Order.findOne({ _id: request.params.oderId }, function (err, order) {
      if (!err && order) {
        order.remove();
        return reply({ message: "Order deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete order"));
    });
};

exports.removeAll = function (request, reply) {
    Mongoose.connection.db.dropCollection('orders', function (err, result) {
      if (!err) {
        return reply({ message: "Order database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete orders"));
    });
};


