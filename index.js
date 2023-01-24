// importing express 
const express = require('express');

// importing cookie parser
const cookieParser = require('cookie-parser');

// defining port number for website
const port = 1000;

// importing mongoose
const database=require('./config/mongoose');

// express session and passport for authentication
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');


// creating app variable
const app = express();

app.use(express.urlencoded());

// for cookies
app.use(cookieParser());

// importing layouts 
const expressLayouts =  require('express-ejs-layouts');

// using layouts
app.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting view engine as ejs and defining its path
app.set('view engine','ejs');
app.set('views','./views');


// middleware for passport and cookie session
app.use(session({
    name:'SocialMedia',
    secret:'encryptedsecretkey',
    saveUninitialized:false,
    resave:false,
    // expiration duration for cookie
    cookie:{
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware to send user data to local
app.use(passport.setAuthenticatedUser);

// setting up routes
app.use('/',require('./routes'));

// path of static files of website
app.use(express.static('assets'));

// firing up the server
app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is up and running on port ${port}`)
})
