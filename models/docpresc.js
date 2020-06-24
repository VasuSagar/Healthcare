const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const UserSchema = mongoose.Schema({
    mname: {
      type: String
    },
    
    
     did:{
       type:String
     }

    
  });

  const Doctormed = module.exports = mongoose.model('Doctormed', UserSchema,"doctormed");

  module.exports.addMedicine = function(newMedicine, callback){
    //cpde
    //code
    //code

    newMedicine.save(callback);


  }

  module.exports.getMedicine = function(did, callback){
    const query = {did:did}
    Doctormed.find(query,{'_id':0,'did':0,'__v':0}, callback);
  }


  