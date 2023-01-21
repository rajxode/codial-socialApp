
// importing express
const express= require('express');


// creating new router variable
const router = express.Router();

// getting home controller for the router
const homeController = require('../controllers/home_controller');


// calling controller for the home page
router.get('/',homeController.home);

// importing user router 
router.use('/user',require('./user'));


// exporting the router for outside use
module.exports = router;