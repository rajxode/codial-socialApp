
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
        if(!user){
            return res.redirect('/');
        }

        return res.render('user_profile',{
            title:"Profile page | Social",
            profile_user:user
        });
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

// controller to update user's name and email
module.exports.update = function(req,res){
    // match user's id in database
    if(req.user.id = req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            if(err){
                console.log('Error in updating the user');
                return;
            }

            req.flash('success','Profile Updated !');
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


// controller to create new user while signing up
module.exports.create_user = async function(req,res){
    
    try{
        // checking password and confirm password 
        if(req.body.password != req.body.cnf_password){
            req.flash('error','Password does not match');
            return res.redirect('back');
        }


        // finding other user with same email address
        let user = await User.findOne({email:req.body.email});

        // if no user find with the given email address
        if(!user){

            // creating new user with the given details via user
            await User.create(req.body);

            // redirecting back to the sign in page after creating the user
            req.flash('success','Welcome! You have created a new account');
            return res.redirect('/user/signin');
        }
        // incase there is an user with the given email
        else{
            req.flash('error','email address already exists');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in creating new user',err);
        return;
    }
}



// to sign in using passport library
module.exports.create_session=function(req,res){
    // creating flash message for signin
    req.flash('success','You have logged in successfully');
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
        req.flash('success','You have logged out successfully');
        return res.redirect('/user/signin');
      });
}