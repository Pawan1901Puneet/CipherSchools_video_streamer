const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const Video = require('../models/video');

exports.updateUser = (req,res,next) => {
    const userId = req.userId;

    User.findById(userId)
    .then(user => {
        if(!user) {
            const error = new Error('No User found!');
            error.status = 401;
            throw error;
        }

        user.name = req.body.name;

        return user.save();
    })
    .then(result => {
        res.status(200).json({
            message : 'User Updated Successfully!',
            user: result
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.deleteUser = (req,res,next) => {
    const userId = req.userId;

    User.findByIdAndDelete(userId)
    .then(result => {
        res.status(204).json({
            message : 'User Deleted Successfully',
            res : result
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.getUser = (req,res,next) => {
    const userId = req.params.userId;

    User.findById(userId).
    then(user => {
            if(!user) {
                const error = new Error('No User found!');
                error.status = 401;
                throw error;
            }

        res.status(200).json({
            user : user._doc
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.subscribeChannel = (req,res,next) => {

    const channelId = req.params.channelId;
    const userId = req.userId;

    User.findById(userId).
    then(user => {

        if(!user) {
            const error = new Error('No User found!');
            error.status = 401;
            throw error;
        }

        user.subscribedUsers.push(new mongoose.Types.ObjectId(channelId));
        return user.save();
    })
    .then(result => {
        console.log(result);
        return User.findById(channelId);
    })
    .then(channel => {

        if(!channel) {
            const error = new Error('No User found!');
            error.status = 401;
            throw error;
        }

        channel.subscribers = channel.subscribers + 1;
        return channel.save();
    })
    .then(result => {
        console.log.apply(result);
        res.status(200).json({
            message : 'Channel Subscribed!'
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.unsubscribeChannel = (req,res,next) => {

    const channelId = req.params.channelId;
    const userId = req.userId;

    User.findById(userId).
    then(user => {

        if(!user) {
            const error = new Error('No User found!');
            error.status = 401;
            throw error;
        }

        let subscribedUsers = user.subscribedUsers;
        subscribedUsers = subscribedUsers.filter(value => value.toString() !== channelId);
        user.subscribedUsers = subscribedUsers;
        
        return user.save();
    })
    .then(result => {
        console.log(result);
        return User.findById(channelId);
    })
    .then(channel => {

        if(!channel) {
            const error = new Error('No User found!');
            error.status = 401;
            throw error;
        }

        channel.subscribers = channel.subscribers - 1;
        return channel.save();
    })
    .then(result => {
        console.log.apply(result);
        res.status(200).json({
            message : 'Channel Unsubscribed!'
        });
    })
    .catch(err => {
        next(err);
    });

}

exports.likeVideo = (req,res,next) => {

    const userId = req.userId;
    const videoId = req.params.videoId;

    Video.findByIdAndUpdate(videoId, {
        $addToSet : { likes : new mongoose.Types.ObjectId(userId)},
        $pull : {dislikes : new mongoose.Types.ObjectId(userId)}
    })
    .then(result => {
        res.status(200).json({
            message : "Video Liked!",
            result : result
        });
    }).catch(err => {
        next(err);
    })
}

exports.dislikeVideo = (req,res,next) => {

    const userId = req.userId;
    const videoId = req.params.videoId;

    Video.findByIdAndUpdate(videoId, {
        $addToSet : { dislikes : new mongoose.Types.ObjectId(userId)},
        $pull : {likes : new mongoose.Types.ObjectId(userId)}
    })
    .then(result => {
        res.status(200).json({
            message : "Video Disliked!",
            result : result
        });
    }).catch(err => {
        next(err);
    })
}