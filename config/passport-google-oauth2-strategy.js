const passport = require('passport');

// for google auth strategy
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user_schema');

const env = require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL  
    },

    function(accessToekn, refreshToekn, profile,done){

        // finding user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google strategy',err);
                return;
            }

            console.log(profile);

            // if user found
            if(user){
                // set it as req.user
                return done(null,user);
            }
            else{

                // if not found create new user and then set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in creating new user via google',err);
                        return;
                    }


                    return done(null,user);
                });
            }
        });
    }

));



module.exports = passport;