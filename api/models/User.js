/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

module.exports = {

  tableName: 'users',
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
        type: 'string',
        minLength: 6,
        required: true
    },
    posts: {
      collection: 'Post',
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            user.password = hash;
            cb();
        }
      });
    });
  }
};

