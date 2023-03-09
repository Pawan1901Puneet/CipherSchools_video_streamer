const express = require('express');
const videoController = require('../controllers/video');
const isAuth = require('../util/auth');

const router = express.Router();

//get subscribed
router.get('/subscribed',isAuth,videoController.getSubscribed);

//get trending
router.get('/trending',videoController.getTrending);

//get random
router.get('/random',videoController.getRandom);

//get by title
router.get('/search',isAuth,videoController.getByTitle);

//get by tag
router.get('/tags',isAuth,videoController.getByTag);

//crate video
router.post('/add',isAuth,videoController.addVideo);

//update video
router.put('/update/:videoId',isAuth,videoController.updateVideo);

//delete video
router.delete('/delete/:videoId',isAuth,videoController.deleteVideo);

//get video
router.get('/:videoId',videoController.getVideo); 

//get viewed
router.put('/view/:videoId',isAuth,videoController.addView);

module.exports = router;