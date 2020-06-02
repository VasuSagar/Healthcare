const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const UserSchema = mongoose.Schema({
    medname: {
      type: String
    },
    
     price:{
       type:Number
     },
     id:{
       type:String
     }

    
  });

  const Medicine = module.exports = mongoose.model('Medicine', UserSchema,"medicines");

  module.exports.addMedicine = function(newMedicine, callback){
    //cpde
    //code
    //code

    newMedicine.save(callback);


  }

  module.exports.editandsave=function(query,upd,callback){
  


    
    Medicine.findOneAndUpdate(query, upd, {upsert: false}, function(err, doc) {
        //if (err) return res.send(500, {error: err});
       // return res.send('Succesfully saved.');
    })


 

  }