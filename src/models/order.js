'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Order Schema
 */
var OrderSchema = new Schema({
    isreadyfor: {
       type: Date,
       required: true,
       default: Date.now
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    cart:{
        type: [],
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Order', OrderSchema);