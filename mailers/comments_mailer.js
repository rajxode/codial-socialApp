const nodemailer = require('../config/nodemailer');

// another way of exporting a function 
exports.newComment = (comment)=>{
    
    // sending mail
    nodemailer.transporter.sendMail({
        // from account of website
        from:'socialmed095@gmail.com',
        // to the user who comment
        to:comment.user.email,
        subject:'New comment posted',
        html:'<h1>Your comment have been posted !</h1>'
    },  (err,info)=>{
        if(err){
            console.log('Error in sending the mail',err);
            return;
        }

        // if there is no error than print mail info with the message
        console.log('mail delivered',info);
        return;
    });
}