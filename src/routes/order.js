"use strict";
// Load modules

var Order      = require('../controllers/order'),
  Validator = require('../validate/order');
  
module.exports = function() {
  return [
    {
      method: 'POST',
      path: '/api/order',
      config : {
        handler: Order.create,
        auth: {
                strategy: 'token',
                scope: ['user']
        }
      }
    },
    {
      method: 'GET',
      path: '/api/order',
      config : {
        handler: Order.getAll,
        auth: {
                strategy: 'token',
                scope: ['user']
        }
      }
    },
    {
      method: 'GET',
      path: '/api/order/{orderId}',
      config : {
        handler : Order.getOne,
        auth: {
                strategy: 'token',
                scope: ['user','admin']
        }
      }
    },
    {
      method: 'PUT',
      path: '/api/order/{orderId}',
      config : {
        handler: Order.update,
        auth: {
                strategy: 'token',
                scope: ['admin']
        }
      }
    },
    {
      method: 'DELETE',
      path: '/api/order/{orderId}',
      config : {
        handler: Order.remove,
        auth: {
                strategy: 'token',
                scope: ['admin']
        }
      }
    }
  ];
}();