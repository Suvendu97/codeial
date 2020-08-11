const passport = require('passport');
// requiring passport-google-strategy
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// const env = require('./environment');
const { access } = require('fs');

// require('dotenv').config();

// setting up passport-google-oauth2
passport.use(new googleStrategy({
    clientID: "447483926833-rsdgh9ljb146jbia53vc9fut0mur25aa.apps.googleusercontent.com",
    clientSecret: "dHMRB2lc6KM0AjMConQIFY4e",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    }, 

    function(accessToken, refreshToken, profile, done){
        // find a user ..
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport', err); return;}

            console.log(profile);

            if(user){
                // if found, set this user as req.user
                return done(null, user);
            } else{
                // if not found create the user and set it as req.user
               User.create({
                   name: profile.displayName,
                   email: profile.emails[0].value,
                   password: crypto.randomBytes(20).toString('hex')
               }, function(err, user){
                   if(err){console.log('error in creating user google-strategy-passport', err); return;}

                   return done(null, user);
               })
            }
        });
    }
))


module.exports = passport;