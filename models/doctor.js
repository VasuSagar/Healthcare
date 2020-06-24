const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    hname: {
      type: String,
      required: true
    }
  });

  const Doctor = module.exports = mongoose.model('Doctor', UserSchema);

  module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) 
          throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }


  module.exports.getUserById = function(id, callback){
    Doctor.findById(id, callback);
  }
  
  module.exports.getUserByEmail = function(email, callback){
    const query = {email: email}
    Doctor.findOne(query, callback);
  }

  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }