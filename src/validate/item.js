"use strict";

var Joi = require('joi'),
	Title = Joi.string().min(3).max(50).required(),
	Content = Joi.string().min(3).max(1000).required(),
	Price = Joi.number().required(),
	Status = Joi.string().regex(/[available|soldout]/),
	Tags = Joi.array().items(Joi.string().trim().lowercase()).unique().min(1).max(3).required(),
         Thumb = Joi.string().required();

exports.create = {
   payload: {
            title: Title,
            content: Content,
            price:  Price,
            status: Status,
            tags: Tags,
            thumb: Thumb
   }
};
  