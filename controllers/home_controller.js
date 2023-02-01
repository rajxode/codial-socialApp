const Post = require('../models/post_schema');


// rendering home page on website
module.exports.home= function(req,res){

    // finding all the posts in database and populating its data
    Post.find({}).populate('user').exec(function(err,posts){
        
        // if error in finding 
        if(err){
            console.log('Error in finding users');
            return;
        }

        // rendering homepage and posts
        return res.render('home',{
            title:"Social Media",
            posts:posts
        });

    });
    
}