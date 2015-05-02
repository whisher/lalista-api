'use strict';
var path = require('path'),
	root = path.resolve(__dirname, '../../../');

module.exports = {
	root:root,
	staticPath:root + '/build',
	uploadsPath:root + '/uploads',
	app: {
		name: 'lalista'
	},
	server: {
		port: process.env.PORT || 3000,
	},
  	db: 'mongodb://localhost/test',
   	key: {
        		apiSecret: 'TYzODU0MSwiZXhwIjoxNDI5NjQyMTQxfQ',
        		expiresInMinutes: 10 //1 hour
    	}
};