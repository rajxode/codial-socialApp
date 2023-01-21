const mongoose = require('mongoose');

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
    }
},{
    // to get the time of creation and update
    timestamps:true
});

// storing schema inside a variable
const User = mongoose.model('User',userSchema);


// exporting for outside use 
module.exports = User;