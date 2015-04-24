'use strict';
var db = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/angular-hapi-production';

module.exports = {
	staticPath:'dist',
	db: db
};
