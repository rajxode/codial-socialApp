const mongoose = require('mongoose');
const { TRUE } = require('node-sass');


const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    // object on which like has been posted and it defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        // dynamic path
        refPath:'onModel'
    },
    // defining the type of the liked object since it is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }

},{
    timestamps:true
});


const Like = mongoose.model('Like',likeSchema);
module.exports = Like;