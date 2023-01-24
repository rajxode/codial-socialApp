// importing passport js
const passport = require('passport');
const { deleteOne } = require('../models/user_schema');

// passport-local strategy  
const LocalStrategy = require('passport-local').Strategy;

// importing database schema
const User = require('../models/user_schema');


// Authentication using passport 
passport.use(new LocalStrategy({
    // unique field 
    usernameField:'email'
    },

    // finding user and authentication of user
    function(email,password,done){
        // finding user via email
        User.findOne({email:email},function(err,user){
            // error in finding user
            if(err){
                console.log('Error in finding user -> passport');
                return done(err);
            }

            // incase user's password doesn't match 
            if(!user || user.password != password){
                console.log('Invalid username/password !!!');
                return done(null,false);
            }

            // incase user email and password match
            return done(null,user);
        });
    }
));

// serializing id for storing in cookies 
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deserializing id for further use from cookies
passport.deserializeUser(function(id,done){
    // finding user by id 
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user -> Passport');
            return done(err);
        }

        return done(null,user);
    })
});



// check whether the user is authenticated or not
passport.checkAuthentication =  function(req,res,next){
    // check if user is signed in or not
    // if user is signed in then pass the request to the next function / action in controller
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 
    return res.redirect('/user/signin');
}


// sending user data to local for view
passport.setAuthenticatedUser = function(req,res,next){
    // check if user is signed in or not
    // if user is signed in then sending current signed in user's data (req.user) to locals for views (res.local.user)
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}


// exporting passport for outside use
module.exports = passport;