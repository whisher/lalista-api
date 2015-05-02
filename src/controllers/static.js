'use strict';

var Config    = require('../config/config');

exports.dist = {
	directory: {
      		path:Config.staticPath,
      		index: true
	}
 };

 exports.thumbs = {
	file: function (request) {
            	return Config.uploadsPath + '/' +request.params.thumb;
        	}
 };
