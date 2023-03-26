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

// passport jwt
const passportJWT = require('./config/passport-jwt-strategy');

// passport google strategy
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// mongo store for storing session / cookie
const MongoStore = require('connect-mongo');

// flash messages package and middleware
const flash = require('connect-flash');
const myMware=require('./config/middleware');


// creating app variable
const app = express();


// setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
// chatServer.listen(5000,function(err){
//     if(err){
//         console.log('Error in connecting with socket',err);
//         return;
//     }
//     console.log('chat server is listening on port 5000');
// });





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
    },
    // to store session cookie
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/SocialMedia_DB' }) 
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware to send user data to local
app.use(passport.setAuthenticatedUser);

// connect-flash middleware
app.use(flash());
app.use(myMware.setFlash);

// setting up routes
app.use('/',require('./routes'));

// path of static files of website
app.use(express.static('assets'));

// for the path of upload file
app.use('/uploads',express.static(__dirname + '/uploads'));

// firing up the server
chatServer.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is up and running on port ${port}`);
})
