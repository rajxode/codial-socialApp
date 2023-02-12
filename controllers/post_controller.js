const Post = require("../models/post_schema");
const Comment =  require('../models/comment_schema');


// creating new post 
module.exports.create=async function(req,res){
    try{
        // creating post
        await Post.create({
            // content and user id
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');

    }catch(err){
        console.log('Error in creating a new post',err);
        return;
    }
}

// to delete a post from the database
module.exports.destroy= async function(req,res){
    try{
        // finding post which we have to delete in database
        let post = await Post.findById(req.params.id);
        
        // .id convert id into string
        if(post.user == req.user.id){
            // removing the post
            post.remove();

            // removing all the comments made on the post
            await Comment.deleteMany({post:req.params.id});
            
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in finding the post',err);
        return;
    }
    
}