const nodemailer = require('../config/nodemailer');

// another way of exporting a function 
exports.newComment = (comment)=>{
    
    // path of html template for mail
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comment/new_comment.ejs');

    // sending mail
    nodemailer.transporter.sendMail({
        // from account of website
        from:process.env.MAIL_SENDER,
        // to the user who comment
        to:comment.user.email,
        subject:'New comment posted',
        html:htmlString
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