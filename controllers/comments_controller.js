// importing schema of both comment and post
const Comment = require('../models/comment_schema');
const Post = require("../models/post_schema");
const commentsMailer = require('../mailers/comments_mailer');

const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

const Like = require('../models/like_schema');


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

                // populating comments for it's info
                comment = await comment.populate('user', 'name email');
                
                // creating a job for comment worker in queue
                let job = queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('Error in creating a queue',err);
                        return;
                    }

                    console.log('job enqueued',job.id);
                });
                // commentsMailer.newComment(comment);

                // checking ajax request
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
    

                req.flash('success','Added new comment on the post!');        
                return res.redirect('/');
        }
    }catch(err){
        console.log(err);
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

            // destory all the associated like on the comment
            await Like.deleteMany({likeAble:comment._id, onModel:'Comment'});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            
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
