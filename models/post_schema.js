const mongoose = require('mongoose');

// variables within the database of post
const postSchema = new mongoose.Schema({
    // content of the post
    content:{
        type:String,
        require:true,
    },
    //user's identity
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},{
    // to get the time of creation and update
    timestamps:true
});

// storing schema inside a variable
const Post = mongoose.model('Post',postSchema);


// exporting for outside use 
module.exports = Post;