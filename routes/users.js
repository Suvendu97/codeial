const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create',usersController.create);

//setting up the path for create-session(in user_controller sign in section)
router.post('/create-session', usersController.createSession);

//sign out
router.get('/sign-out', usersController.destroySession);

module.exports = router;
