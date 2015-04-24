"use strict";

var Joi = require('joi'),
Title = Joi.string().min(3).max(50).required(),
Content = Joi.string().min(3).max(1000).required(),
Price = Joi.number().required(),
Status = S.regex(/[available|soldout]/),
Tag = Joi.string().min(3).max(20).required(),
exports.create = {
   payload: {
            title: Title,
            content: Content,
            price:  Price,
            status: Status,
            tag: Tag
   }
}
  