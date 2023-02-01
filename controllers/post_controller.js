const Post = require("../models/post_schema");

module.exports.create=function(req,res){
    Post.create({
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