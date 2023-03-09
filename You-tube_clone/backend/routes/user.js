const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../util/auth');

const router = express.Router();

//update user
router.put('/update/',isAuth,userController.updateUser);

//delete user
router.delete('/delete/:userId',isAuth,userController.deleteUser);

//get a user
router.get('/:userId',userController.getUser);

//subscribe a channel
router.put('/subscribe/:channelId',isAuth,userController.subscribeChannel);

//un-subscribe a channel
router.put('/unsubscribe/:channelId',isAuth,userController.unsubscribeChannel);

//like video
router.put('/like/:videoId',isAuth,userController.likeVideo);

//dislike video
router.put('/dislike/:videoId',isAuth,userController.dislikeVideo);

module.exports = router;