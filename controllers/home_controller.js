const Post = require('../models/post_schema');
const User = require('../models/user_schema');


// rendering home page on website
module.exports.home= async function(req,res){

    try{

        // finding all the posts in database and populating its data
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            // populating comments data and user who commented
            path:'comments',
            populate: {
                path:'user'
            },
            populate:{
                // number of likes for comments
                path:'likes'
            }
        }).populate('comments').populate('likes');  //likes for post
        
        let users = await User.find({});
        
        // rendering homepage and posts
        return res.render('home',{
            title:"Social Media",
            posts:posts,
            all_users:users
        });

    }catch(err){
        console.log('Error',err);
        return;       
    }
    
}