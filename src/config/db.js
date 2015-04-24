'use strict';

/**
 * Module dependencies.
 */
var Mongoose = require('mongoose');

module.exports = function(config) {
	var db = Mongoose.connect(config.db, function(err) {
		if (err) {
			console.error('Could not connect to MongoDB!');
			console.log(err);
		}
	});
	return db;
};
