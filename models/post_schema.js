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
    },
    // getting all the comments id's made on the post
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    // to get the time of creation and update
    timestamps:true
});

// storing schema inside a variable
const Post = mongoose.model('Post',postSchema);


// exporting for outside use 
module.exports = Post;