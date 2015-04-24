"use strict";
// Load modules

var User      = require('../controllers/user'),
  Validator = require('../validate/user');
  
module.exports = function() {
  return [
    {
      method: 'POST',
      path: '/api/auth',
      config : {
        handler: User.auth
      }
    },
    {
      method: 'GET',
      path: '/api/logout',
      config : {
        handler: User.logout
      }
    },
    {
      method: 'POST',
      path: '/api/user',
      config : {
        handler: User.create,
        validate: Validator.create
      }
    },
    {
      method: 'GET',
      path: '/api/user',
      config : {
        handler: User.getAll,
        auth: {
                strategy: 'token',
                scope: ['admin']
        }
      }
    },
    {
      method: 'GET',
      path: '/api/user/{userId}',
      config : {
        handler : User.getOne
      }
    },
    {
      method: 'PUT',
      path: '/api/user/{userId}',
      config : {
        handler: User.update
        
      }
    },
    {
      method: 'DELETE',
      path: '/api/user/{userId}',
      config : {
        handler: User.remove
      }
    }
  ];
}();