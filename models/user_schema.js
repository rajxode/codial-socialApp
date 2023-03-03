const mongoose = require('mongoose');

// for uploading profile picture
const multer = require('multer');
// path of file
const path = require('path');
const AVATAR_PATH   = path.join('/uploads/users/avatars');

// variables within the database of user
const userSchema = new mongoose.Schema({
    // unique email id for every user
    email:{
        type:String,
        require:true,
        unique:true,
    },
    // name of user
    name:{
        type:String,
        require:true,
    },
    // user password
    password:{
        type:String,
        require:true,
    },
    // for storing path of the file
    avatar: {
        type:String
    }
},{
    // to get the time of creation and update
    timestamps:true
});


// storing the file at destination folder with an unique filename
let storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,path.join(__dirname, '..' , AVATAR_PATH));
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now());
    }
});


// static function for uploaded files
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

// storing schema inside a variable
const User = mongoose.model('User',userSchema);


// exporting for outside use 
module.exports = User;