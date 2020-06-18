const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const UserSchema = mongoose.Schema({
    medname: {
      type: Array
    },
    price: {
      type: Array
      
    },
   quantity: {
      type: Array
          },
          total: {
            type: Number
                }
    
  });

  const Prescriptionchem = module.exports = mongoose.model('Prescriptionchem', UserSchema);

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