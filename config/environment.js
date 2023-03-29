require('dotenv').config();

const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// path of storing logs
const logDirectory= path.join(__dirname,'../production_logs');

// check whether logs already exits or we need to create it
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});


// variables for development mode
const development = {
    name:'development',
    asset_path:process.env.SOCIAL_ASSETS_PATH,
    session_cookie_key:process.env.SOCIAL_SESSION_COOKIE_KEY,
    db:process.env.SOCIAL_DATABASE,
    smtp:{
        service: 'gmail',
        host:'smtp.gmail.com',
        port:process.env.SOCIAL_SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SOCIAL_SMTP_USER,
            pass:process.env.SOCIAL_SMTP_PASSWORD
        }
    },
    google_clientID:process.env.SOCIAL_GOOGLE_CLIENTID,
    google_clientSecret:process.env.SOCIAL_GOOGLE_CLIENTSECRET,
    google_callbackURL:process.env.SOCIAL_GOOGLE_CALLBACK,
    jwt_secretKey:process.env.SOCIAL_JWT_SECRETKEY,
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}
    }
}



const production = {
    name:'production',
    asset_path:process.env.SOCIAL_ASSETS_PATH,
    session_cookie_key:process.env.SOCIAL_SESSION_COOKIE_KEY,
    db:process.env.SOCIAL_DATABASE,
    smtp:{
        service: 'gmail',
        host:'smtp.gmail.com',
        port:process.env.SOCIAL_SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SOCIAL_SMTP_USER,
            pass:process.env.SOCIAL_SMTP_PASSWORD
        }
    },
    google_clientID:process.env.SOCIAL_GOOGLE_CLIENTID,
    google_clientSecret:process.env.SOCIAL_GOOGLE_CLIENTSECRET,
    google_callbackURL:process.env.SOCIAL_GOOGLE_CALLBACK,
    jwt_secretKey:process.env.SOCIAL_JWT_SECRETKEY,
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}
    }
}



module.exports = eval(process.env.SOCIAL_ENVIRONMENT) ==  undefined ? development : eval(process.env.SOCIAL_ENVIRONMENT);