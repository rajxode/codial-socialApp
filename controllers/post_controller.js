const Post = require("../models/post_schema");
const Comment =  require('../models/comment_schema');
const Like = require('../models/like_schema');

// creating new post 
module.exports.create=async function(req,res){
    try{
        // creating post
        let post = await Post.create({
            // content and user id
            content:req.body.content,
            user:req.user._id
        });

        // checking if it's an ajax request
        if(req.xhr){
            // returning json
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            });
        }


        // showing notification and return back 
        req.flash('success','New Post added!');
        return res.redirect('back');

    }catch(err){
        req.flash('error','Error in creating new post!');
        return res.redirect('back');
    }
}

// to delete a post from the database
module.exports.destroy= async function(req,res){
    try{
        // finding post which we have to delete in database
        let post = await Post.findById(req.params.id);
        
        // .id convert id into string
        if(post.user == req.user.id){

            // for deleting all the likes on the post and the comments of that post
            await Like.deleteMany({likeAble: post,onModel:'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            // removing the post
            post.remove();

            // removing all the comments made on the post
            await Comment.deleteMany({post:req.params.id});

            //for ajax request
            if (req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                })
            }

            
            req.flash('success','Post is deleted with all the comments!');
            return res.redirect('back');
            
        }else{
            req.flash('error','You are not authorized to delete this post !');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error in finding the post!');
        return res.redirect('back');
    }
    
}