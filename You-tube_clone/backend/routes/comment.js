const express = require('express');
const commentController = require('../controllers/comment');
const isAuth = require('../util/auth');

const router = express.Router();


router.get('/comments/:videoId',isAuth,commentController.getComments);

router.delete('/comment/:commentId/:videoId',isAuth,commentController.deleteComment);

router.post('/comment/:videoId',isAuth,commentController.addComment);

module.exports = router;
