// importing mongoose
const mongoose=require('mongoose');


// creating comment schema to store in database
const commentSchema = new mongoose.Schema({
    // content of the comment
    content:{
        type:String,
        require:true
    },

    // user who write the comment
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    // post on which the comment is made on
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },

    // all the likes on the comment
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    // time stamps to keep record of time 
    timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);

// exporting the schema
module.exports = Comment;