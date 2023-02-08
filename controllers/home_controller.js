const Post = require('../models/post_schema');
const User = require('../models/user_schema');


// rendering home page on website
module.exports.home= function(req,res){

    // finding all the posts in database and populating its data
    Post.find({})
    .populate('user')
    .populate({
        // populating comments data and user who commented
        path:'comments',
        populate: {
            path:'user'
        }
    }).exec(function(err,posts){
        
        // if error in finding 
        if(err){
            console.log('Error in finding users');
            return;
        }


        User.find({},function(err,users){
            // rendering homepage and posts
            return res.render('home',{
                title:"Social Media",
                posts:posts,
                all_users:users
            });
        })
        

    });
    
}