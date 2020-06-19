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


const DiseaseSchema=mongoose.Schema({
  dname:{
    type:String
  },
  medicine:{
    type:Array
  }
});



const User = module.exports = mongoose.model('User', UserSchema);



var Disease = mongoose.model('Disease',DiseaseSchema);

module.exports.getDisease=()=>{
  
  Disease.findOne({'dname':'maleriya'},'medicine',function(err,disease){
    if (err) return handleError(err);
   
    console.log(disease);
  });
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}
module.exports.getUserByUsername = function(uname, callback){
  const query = {username:uname}
  User.findOne(query,{'_id':0,'name':0,'username':0,'password':0,'__v':0}, callback);
}




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

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}