'use strict';

var Config    = require('../config/config');

exports.handler = {
	directory: {
      		path:Config.staticPath,
      		index: true
	}
 };
