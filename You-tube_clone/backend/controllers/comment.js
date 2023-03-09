const Comment = require('../models/comment');
const mongoose = require('mongoose');
const Video = require('../models/video');

exports.addComment = (req, res, next) => {

    const videoId = req.params.videoId;
    const userId = req.userId;

    const comment = new Comment({
        desc: req.body.desc,
        userId: new mongoose.Types.ObjectId(userId),
        videoId: new mongoose.Types.ObjectId(videoId)
    });

    comment.save()
        .then(result => {
            res.status(201).json({
                message: "Comment added!",
                comment: result._doc
            });
        })
        .catch(err => {
            next(err);
        });
}

exports.deleteComment = (req, res, next) => {

    const commentId = req.params.commentId;
    const videoId = req.params.videoId;

    let video;

    Video.findById(videoId)
        .then(video => {
            video = video;
            return Comment.findById(commentId);
        })
        .then(comment => {
            if (!(comment.userId.toString() === req.userId || video.userId.toString() === req.userId)) {
                const error = new Error("Unauthorized to perform this action!");
                error.status(403);
                throw error;
            }

            return Comment.findByIdAndDelete(commentId);
        })
        .then(result => {
            res.status(202).json({
                message : 'Comment deleted Successfully!',
                result : result
            });
        })
        .catch(err => {
            next(err);
        });
}

exports.getComments = (req, res, next) => {

    const videoId = req.params.videoId;

    Comment.find({ videoId: videoId }).sort({createdAt : -1 }).limit(20)
        .then(comments => {
            res.status(200).json({
                comments: comments
            });
        }).catch(err => {
            next(err);
        })

}