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
    quantity: {
       type: Array
           },
     username:{
       type:String
     },
     dname:{
      type:String
    },
    hname:{
      type:String
    },
     otp:{
       type:String
     } ,
     disease:{
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

  module.exports.viewprepat = function(uname, callback){
  
    const query = {username:uname}
    Prescription.find(query, callback);
  }