const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User Schema
const UserSchema = mongoose.Schema({
    dname: {
      type: String
    },
    desc: {
      type: String,
      
    },
    symp: {
      type: String,
      
    },
    tre: {
      type: String,
  
    },
    cause: {
        type: String,
        
      }
    
  });
  const Disease = module.exports = mongoose.model('Diseases', UserSchema);

  module.exports.addDisease = function(newDisease, callback){
   
        newDisease.save(callback);
      }