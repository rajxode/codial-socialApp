
// for sending mails 
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { mainModule } = require('process');

const env = require('./environment');



// part responsible for sending the email
let transporter = nodemailer.createTransport(env.smtp);


// it defines where the files will be stored for html emails
let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(

        // path of html emails
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template',err);
                return;
            }

            mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}

