'use strict';
var db = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/angular-hapi-developer';

module.exports = {
	staticPath:'build',
	db: db,
};
