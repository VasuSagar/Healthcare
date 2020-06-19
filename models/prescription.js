const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const UserSchema = mongoose.Schema({
    medname: {
      type: Array
    },
    breakfast: {
      type: Array
      
    },
   lunch: {
      type: Array
          },
     username:{
       type:String
     },
     otp:{
       type:String
     }   
    
  });

  const Prescription = module.exports = mongoose.model('Prescription', UserSchema);

  module.exports.addPrescription = function(newPrescription, callback){
    //cpde
    //code
    //code

    newPrescription.save(callback);
    

  }

  module.exports.authotp = function(uname,otp, callback){
  
    const query = {username:uname,otp:otp}
    Prescription.find(query, callback);
  }