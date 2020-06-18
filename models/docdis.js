const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const UserSchema = mongoose.Schema({
    dname: {
      type: String
    },
    
    
     did:{
       type:String
     }

    
  });

  const Doctordis = module.exports = mongoose.model('Doctordis', UserSchema,"doctordis");

  module.exports.addDisease = function(newMedicine, callback){
    //cpde
    //code
    //code

    newMedicine.save(callback);


  }

  module.exports.getDisease = function(callback){
   
    Doctordis.find({'_id':0,'did':0,'__v':0}, callback);
  }
  

  