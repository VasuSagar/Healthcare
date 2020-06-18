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
    }
  });

  const Chemist = module.exports = mongoose.model('Chemist', UserSchema,"chemist");  //if we dont provide 3rd argument(collection name) it will automatically add s at the end 

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
    Chemist.findById(id, callback);
  }
  
  module.exports.getUserByEmail = function(email, callback){
    const query = {email: email}
    Chemist.findOne(query, callback);
  }

  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }