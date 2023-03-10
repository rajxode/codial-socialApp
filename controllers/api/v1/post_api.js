const Post = require('../../../models/post_schema');
const Comment = require('../../../models/comment_schema');

module.exports.index = async function(req,res){
    

    // rendering all the post from database
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            // populating comments data and user who commented
            path:'comments',
            populate: {
                path:'user'
            }
        });
    
    // returning data in json format
    return res.json(200,{
        message:"List of posts",
        posts: posts
    });
}



// to delete a post from the database
module.exports.destroy= async function(req,res){
    try{
        // finding post which we have to delete in database
        let post = await Post.findById(req.params.id);
        
        // authenticating user before deleting the post
        if(post.user == req.user.id){
            post.remove();

            // removing all the comments made on the post
            await Comment.deleteMany({post:req.params.id});

            return res.json(200,{
                message:"Post and associated comments are deleted"
            });
        }else{
            return res.json('401',{
                message:"You cannot delete this post"
            });
        }
            
    }catch(err){
        console.log('error ',err);
        return res.json(500,{
            message:"Interal server error"
        });
    }
    
}