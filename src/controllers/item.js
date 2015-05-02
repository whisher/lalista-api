'use strict';

var _ = require('lodash'),
  Boom = require('boom'),
  Config = require('../config/config'),
  Fs = require('fs'),
  Im = require('imagemagick-stream'),
  Mongoose = require('mongoose'),
  Item  = Mongoose.model('Item'),
  Path = require('path'),
  Jwt = require('jsonwebtoken');



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
        return reply(item);
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
    Item.findOne({ _id: request.params.itemId }, function (err, item) {
      if (!err) {
        item.title = request.payload.title;
        item.content = request.payload.content;
        item.price = request.payload.price;
        item.url = request.payload.url;
        item.status = request.payload.status;
        item.save(function (err, item) {
          if (!err) {
            return reply(item); // HTTP 201
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
    Item.findOne({ _id: request.params.itemId }, function (err, item) {
      if (!err && item) {
        item.remove();
        return reply({ message: "Item deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete item"));
    });
};

exports.removeAll = function (request, reply) {
    Mongoose.connection.db.dropCollection('items', function (err, result) {
      if (!err) {
        return reply({ message: "Item database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete item"));
    });
};

/**
 * List of tags
 */
exports.tags = function(request, reply) {
    Item.distinct('tags').exec(function(err, tags) {
      if (!err) {
        return reply(tags);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
};

/**
 * List of items by tag
 */
exports.fetchByTag = function(request, reply) {
  Item.find({ tags: request.params.tag }).sort('-created').exec(function(err, items) {
    if (!err) {
      return reply(items);
    }
    return reply(Boom.badImplementation(err)); // 500 error
  });
};

/**
 * Upload
 */
exports.upload = function(request, reply) {
  var data = request.payload;
  if (data.file) {
    var name = data.file.hapi.filename;
    var ext = Path.extname(name);
    var thumb = Math.random().toString(36).slice(2);
    var path = Config.uploadsPath + '/' + thumb  + ext;

    var file = Fs.createWriteStream(path);
    file.on('error', function (err) { 
      return reply(Boom.badImplementation(err));
    });
    var resize = Im().resize('300x300').gravity('center').crop('150x150+0+0').quality(90);
    var out = data.file.pipe(resize).pipe(file);
    out.on('error', function (err) { 
      return reply(Boom.badImplementation(err));
    });
    out.on('finish', function () { 
      var res = {
        filename: data.file.hapi.filename,
        thumb: thumb + ext,
        headers: data.file.hapi.headers
      };
      reply(res);
    });
  }
};
