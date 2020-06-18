
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Chemist=require('../models/chemist');
const config = require('../config/database');
const Doctor=require('../models/doctor');
module.exports= function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Doctor.getUserById(jwt_payload.data._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}

