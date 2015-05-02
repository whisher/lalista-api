"use strict";

var Joi = require('joi'),
	Username = Joi.string().min(3).max(15).required(),
	Email = Joi.string().email(),
	Password = Joi.string().min(3).max(15).required(),
	Credential = Joi.string().required();
exports.create = {
   payload: {
            username: Username,
            email: Email,
            password: Password,
      	password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
   }
};
exports.auth = {
   payload: {
            credential: Credential,
            password: Password,
   }
};
  