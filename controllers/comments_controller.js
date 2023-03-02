// importing schema of both comment and post
const Comment = require('../models/comment_schema');
const Post = require("../models/post_schema");

// creating a comment
module.exports.create= async function(req,res){
    // finding post with post id
    try{
        let post = await Post.findById(req.body.post);

        // if post found in database
        if(post){
            
            // create comment
            let comment = await Comment.create({
                // filling up comment schema 
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });

                // adding comment in the comments array of post
                post.comments.push(comment);
                // saving post (updating)
                post.save();

                req.flash('success','Added new comment on the post!');        
                return res.redirect('/');
        }
    }catch(err){
        req.flash('error','Error in posting the comment!');
        return res.redirect('back');
    }
}




// to delete a comment
module.exports.destroy = async function(req,res){
    try{
        // finding comment
        let comment= await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            let postId=comment.post.id;

            comment.remove();
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            
            req.flash('success','Comment deleted !');
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this comment!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error in deleting the comment!');
        return res.redirect('back');
    }
}
