"use strict";
// Load modules

var Item      = require('../controllers/item'),
  Validator = require('../validate/item');
  
module.exports = function() {
  return [
    {
      method: 'POST',
      path: '/api/item',
      config : {
        handler: Item.create,
        validate: Validator.create,
        auth: {
                strategy: 'token',
                scope: ['admin']
        }
      }
    },
    {
      method: 'GET',
      path: '/api/item',
      config : {
        handler: Item.getAll
      }
    },
    {
      method: 'GET',
      path: '/api/item/{itemId}',
      config : {
        handler : Item.getOne
      }
    },
    {
      method: 'PUT',
      path: '/api/item/{itemId}',
      config : {
        handler: Item.update,
       auth: {
                strategy: 'token',
                scope: ['admin']
        }
      }
    },
    {
      method: 'DELETE',
      path: '/api/item/{itemId}',
      config : {
        handler: Item.remove,
        auth: {
                strategy: 'token',
                scope: ['admin']
        }
      }
    },
    {
      method: 'GET',
      path: '/api/tags',
      config : {
        handler: Item.tags
      }
    },
    {
      method: 'GET',
      path: '/api/tags/{tag}',
      config : {
        handler: Item.fetchByTag
      }
    },
    {
      method: 'POST',
      path: '/api/upload',
      config : {
        payload: {
            maxBytes: 2097152,
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        handler: Item.upload
      }
    }
  ];
}();