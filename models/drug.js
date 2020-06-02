const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User Schema
const UserSchema = mongoose.Schema({
    mname: {
      type: String
    },
    desc: {
      type: String,
      
    },
    uses: {
      type: String,
      
    },
    pre: {
      type: String,
  
    }
    
  });
  const Drug = module.exports = mongoose.model('Drug', UserSchema);

  module.exports.addDrug = function(newDrug, callback){
   
        newDrug.save(callback);
      }