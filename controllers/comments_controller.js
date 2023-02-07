// importing schema of both comment and post
const Comment = require('../models/comment_schema');
const Post = require("../models/post_schema");

// creating a comment
module.exports.create=function(req,res){
    // finding post with post id
    Post.findById(req.body.post , function(err,post){
        if(err){
            console.log('Error in finding the post');
            return;
        }

        // if post found in database
        if(post){
            // create comment
            Comment.create({
                // filling up comment schema 
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){

                if(err){
                    console.log('Error in creating the comment');
                    return;
                }

                // adding comment in the comments array of post
                post.comments.push(comment);
                // saving post (updating)
                post.save();

                return res.redirect('/');
            })
        }
        
    })
}