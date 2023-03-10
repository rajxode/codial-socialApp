
// importing passport for authentication
const passport = require('passport');

// importing jwt strategy
const JWTStrategy = require('passport-jwt').Strategy;

// for extracting jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;

// user schema
const User = require('../models/user_schema');

// for encryption of key
let opts = {
    // key
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'secretCode'
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    // finding user in database with id (stored within the payload)
    User.findById(jwtPayLoad._id, function(err,user){
        // if there is an error
        if(err){
            console.log('Error in finding the user from JWT');
            return;
        }

        // if user found
        if(user){
            // return user
            return done(null,user);
        }else{
            // if user not found return false
            return done(null,false);
        }
    })
}));


// exporting passport
module.exports = passport;