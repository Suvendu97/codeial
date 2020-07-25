const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

//when getting /profile in the url we are going to  profile func of user_controller.js file
router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create',usersController.create);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession)

// //setting up the path for create-session(in user_controller sign in section)
// router.post('/create-session', usersController.createSession);

// //sign out
router.get('/sign-out', usersController.destroySession);

module.exports = router;
