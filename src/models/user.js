'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt   = require('bcrypt-nodejs');
  
/**
* User schema
*/
var UserSchema = new Schema({
  username: {
    type: String,
    unique:true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique:true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  provider: {
    type: String,
    default: 'local'
  },
  scope: {
      type: String,
      enum: ['user','admin'],
      default: 'user'
  }  
});

/**
* Presave hook
*/
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.password = this.generateHash(this.password);
  }
  next();
});

/**
* Generating a hash
*/
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

/**
* Authenticate
*/
UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.statics.isUser = function(payload, cb) {
  this.findOne({ $or:[ {'username':payload.username}, {'email':payload.username} ]}).exec(cb);
};

/**
* Create the model for users and expose it to our app
*/
mongoose.model('User', UserSchema);
