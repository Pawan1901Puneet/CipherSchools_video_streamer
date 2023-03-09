const mongoose = require('mongoose');
const Video = require('../models/video');
const User = require('../models/user');

exports.addVideo = (req,res,next) => {

    const video = new Video({
        userId : new mongoose.Types.ObjectId(req.userId),
        ...req.body
    });

    video.save()
    .then(result => {
        res.status(201).json({
            message : 'Video Uploaded Successfully!',
            result : result._doc
        });
    })
    .catch(err => {
        next(err);
    })

}

exports.updateVideo = (req,res,next) => {

    const videoId = req.params.videoId;
    Video.findById(videoId)
    .then(video => {
        if(!video) {
            const error = new Error('Video not Found!');
            error.status = 404;
            throw error;
        }

        if(video.userId.toString() !== req.userId) {
            const error = new Error('Unauthorized to perform this action');
            error.status = 403;
            throw error;
        }

        return Video.findByIdAndUpdate(videoId,
        {
            $set : req.body,
        },{ new : true });
    })
    .then(updatedResult => {
        res.status(200).json({
            message : 'Video Updated Successfully!',
            result : updatedResult
        });
    })
    .catch(err => {
        next(err);
    })    
}

exports.deleteVideo = (req,res,next) => {

    const videoId = req.params.videoId;

    Video.findByIdAndDelete(videoId)
    .then(result => {

        res.status(202).json({
            message : 'Video Deleted Successfully!',
            result : result
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.getVideo = (req,res,next) => {

    const videoId = req.params.videoId;
    Video.findById(videoId)
    .then(video => {
        if(!video) {
            const error = new Error('Video not Found!');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            video : video
        });
    }).catch(err => {
        next(err);
    });
}

exports.addView = (req,res,next) => {

    const videoId = req.params.videoId;
    Video.findByIdAndUpdate(videoId,{
        $inc : {views : 1}
    })
    .then(result => {
        res.status(200).json('the view is increased!');
    })
    .catch(err => {
        next(err);
    });
}

exports.getRandom = (req,res,next) => {
    
    Video.aggregate([{$sample : {size : 40}}])
    /*.then(videos => {

        return Video.populate(videos , {path : "userId"});
    })*/
    .then(videos => {
        res.status(200).json({
            videos : videos
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.getSubscribed = (req,res,next) => {
    User.findById(req.userId)
    .then(user => {

        if(!user) {
            const error = new Error('No User found!');
            error.status = 401;
            throw error;
        }

        const subscribed = user.subscribedUsers;
        console.log(subscribed);

        return Promise.all(
            subscribed.map(channelId => {
                return Video.find({userId : channelId});
            })
        );
    })
    .then(videos => {
        res.status(200).json({
            videos : videos.flat().sort((a,b) => b.createdAt - a.createdAt)
        });
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

exports.getTrending = (req,res,next) => {

    Video.find().sort({views : -1})
    .then(videos => {
        res.status(200).json({
            videos : videos
        });
    }).catch(err => {
        next(err);
    });
}

exports.getByTag = (req,res,next) => {

    const tags = req.query.tags.split(',');
    
    Video.find({tags : {$in : tags }}).limit(20)
    .then(videos => {
        res.status(200).json({
            videos : videos
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.getByTitle = (req,res,next) => {
    const title = req.query.title;

    Video.find({title : new RegExp(title,'i' )}).limit(40)
    .then(videos => {
        res.status(200).json({
            videos : videos
        });
    })
    .catch(err => {
        next(err);
    });
}