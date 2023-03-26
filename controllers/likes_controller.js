const Like = require('../models/like_schema');
const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');

// to like or unlike a post/comment
module.exports.toggelLike = async function(req,res){
    try{

        // url: /likes/toggle/?id=abcdef&type=Post
        let likeAble;
        let deleted = false;


        // type of likeAble {post/comment}
        if(req.query.type == 'Post'){
            likeAble = await Post.findById(req.query.id).populate('likes');
        }else{
            likeAble = await Comment.findById(req.query.id).populate('likes');
        }


        // check if a like already exists
        let existingLike = await Like.findOne({
            likeAble:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });

        // if a like exists then delete it
        if(existingLike){
            likeAble.likes.pull(existingLike._id);
            likeAble.save();

            existingLike.remove();
            deleted = true;
        }else{
            // else make a new like

            let newLike = await Like.create({
                user:req.user._id,
                likeAble:req.query.id,
                onModel:req.query.type
            });

            likeAble.likes.push(newLike._id);
            likeAble.save();

        }

        return res.json(200,{
            message:"Request Successful!",
            data:{
                deleted:deleted
            }
        });


    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal server Error'
        });
    }
}  