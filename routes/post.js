
// importing express
const express= require('express');

// creating new router variable
const router = express.Router();

// imorting passport to check user's authentication
const passport=require('passport');

// controller for post actions 
const postController = require('../controllers/post_controller');

// calling controller and checking authentication of user
router.post('/create',passport.checkAuthentication,postController.create);

// calling controller and checking authentication of user
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

// exporting router for use
module.exports = router;
