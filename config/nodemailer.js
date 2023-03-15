
// for sending mails 
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { mainModule } = require('process');



// part responsible for sending the email
let transporter = nodemailer.createTransport({
    // service used to send email
    service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'socialmed095@gmail.com',
        pass:'cmijdudewjbiskvn'
    }
});


// it defines where the files will be stored for html emails
let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(

        // path of html emails
        path.join(__dirname,'../view/mailers',relativePath),
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

