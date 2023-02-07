const Post = require("../models/post_schema");
const Comment =  require('../models/comment_schema');


// creating new post 
module.exports.create=function(req,res){
    // creating post
    Post.create({
        // content and user id
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('Error in creating a new post');
            return;
        }

        return res.redirect('back');
    })
}

// to delete a post from the database
module.exports.destroy=function(req,res){
    // finding post which we have to delete in database
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log('Error in finding the post');
            return;
        }
        // .id convert id into string
        if(post.user == req.user.id){
            // removing the post
            post.remove();

            // removing all the comments made on the post
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}