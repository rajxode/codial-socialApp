// importing express
const express= require('express');

// creating router variable 
const router = express.Router();

// importing controller for router
const userController = require('../controllers/user_controller');

// calling action for user
router.get('/',userController.home);

// sign in page
router.get('/signin',userController.signin);

// sign up page
router.get('/signup',userController.signup);

// crating new user in sign up page
router.post('/create-user',userController.create_user);

// exporting router for outside use
module.exports = router;