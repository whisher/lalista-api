"use strict";

var Joi = require('joi'),
S = Joi.string().min(3).max(15).required();
exports.create = {
   payload: {
            username: S,
            email: Joi.string().email(),
            password: S,
      	password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
   }
}
  