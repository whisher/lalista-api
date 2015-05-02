"use strict";
// Load modules

var Static    = require('../controllers/static');

module.exports = function() {
  return [
    {
      method: 'GET',
      path: '/{somethingss*}',
      config : {
        handler: Static.dist
      }
    },
    {
      method: 'GET',
      path: '/uploads/{thumb}',
      config : {
        handler: Static.thumbs
      }
    }
  ];
}();
