// importing express 
const express = require('express');

// importing cookie parser
const cookieParser = require('cookie-parser');

// defining port number for website
const port = 1000;

// importing mongoose
const database=require('./config/mongoose');

// creating app variable
const app = express();

app.use(express.urlencoded());
app.use(cookieParser());

// importing layouts 
const expressLayouts =  require('express-ejs-layouts');

// using layouts
app.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setting up routes
app.use('/',require('./routes'));

// setting view engine as ejs and defining its path
app.set('view engine','ejs');
app.set('views','./views');

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
