const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();


//create user
router.post('/signup',authController.Signup);

//login
router.post('/signin',authController.Signin);

//google sign in
router.post('/google',authController.signInWithGoogle);


module.exports = router;