
// importing user database
const User = require('../models/user_schema');


// controller for rendering user page
module.exports.home=function(req,res){
    return res.render('user',{
        title:"Social | User Page"
    });
}


// rendering user's profile page after signing in
module.exports.user_profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"Profile page | Social",
            profile_user:user
        })
    });
}


// controller for rendering sign in page
module.exports.signin=function(req,res){

    // if user is already signed in then redirect to user_profile page
    if(req.isAuthenticated()){
        return res.redirect('/user/user-profile');
    }

    return res.render('user_signIn_page',{
        title:"Social | SignIn"
    });
}


// controller for rendering sign up page
module.exports.signup=function(req,res){
    
    // if user is already signed in then redirect to user_profile page
    if(req.isAuthenticated()){
        return res.redirect('/user/user-profile');
    }
    
    return res.render('user_signUp_page',{
        title:"Social | SignUp"
    });
}


// controller to create new user while signing up
module.exports.create_user = function(req,res){
    
    // checking password and confirm password 
    if(req.body.password != req.body.cnf_password){
        return res.redirect('back');
    }


    // finding other user with same email address
    User.findOne({email:req.body.email},function(err,user){

        // incase of an error
        if(err){
            console.log('Error in finding the user');
            return;
        }

        // if no user find with the given email address
        if(!user){

            // creating new user with the given details via user
            User.create(req.body , function(err,user){

                // if there is any error
                if(err){
                    console.log('Error in creating the user');
                    return;
                }

                // redirecting back to the sign in page after creating the user
                return res.redirect('/user/signin');
            })
        }

        // incase there is an user with the given email
        else{
            return res.redirect('back');
        }
    })
}


// to sign in using passport library
module.exports.create_session=function(req,res){
    // redirecting to home page after signing in 
    return res.redirect('/');
}


// to sign out 
module.exports.signout=function(req,res){
    // signin out from page
    req.logout(function(err) {
        // incase of error
        if (err) { return next(err); }

        // if no error then redirect to the signin page
        return res.redirect('/user/signin');
      });
}