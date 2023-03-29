// importing user schema
const User = require('../../../models/user_schema');

// json web token to create token
const jwt = require('jsonwebtoken');

const env = require('../../../config/environment');

// creating session token
module.exports.creatSession = async function(req,res){

    try{
        // finding user with email address
        let user = await User.findOne({email:req.body.email});

        // if user not found or the entered password doesn't match in database
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            });
        }

        // if user found and password matches
        return res.json(200,{
            message: 'Sign in successfully, here is your token',
            // creating token using secret key with expiry time
            data:{
                token: jwt.sign(user.toJSON(), env.jwt_secretKey, {expiresIn:'100000'})
            }
        })
    }catch(err){
        // if there is any error
        console.log('Error',err);
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}
