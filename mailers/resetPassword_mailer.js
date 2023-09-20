const nodemailer = require('../config/nodemailer');

// another way of exporting a function 
exports.resetPassword = (user)=>{
    
    // path of html template for mail
    let htmlString = nodemailer.renderTemplate({user:user},'/resetPassword/reset_password.ejs');

    // sending mail
    nodemailer.transporter.sendMail({
        // from account of website
        from:process.env.MAIL_SENDER,
        // to the user who comment
        to:user.email,
        subject:'Reset Your Password',
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