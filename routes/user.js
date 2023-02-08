// importing express
const express= require('express');

// creating router variable 
const router = express.Router();

// import passport for use
const passport=require('passport');

// importing controller for router
const userController = require('../controllers/user_controller');

// calling action for user
router.get('/',userController.home);

// checking whether user is signed in or not before rendering the user_profile page
router.get('/user-profile/:id',passport.checkAuthentication,userController.user_profile);

// sign in page
router.get('/signin',userController.signin);

// sign up page
router.get('/signup',userController.signup);

// crating new user in sign up page
router.post('/create-user',userController.create_user);

// signin router using a middleware function
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'},
),userController.create_session);


// for signing out 
router.get('/sign-out',userController.signout);

// exporting router for outside use
module.exports = router;