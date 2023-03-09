const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({

    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true,
    },
    imgUrl : {
        type : String,
        required : true
    },
    videoUrl : {
        type : String,
        required : true
    },
    views : {
        type : Number,
        default : 0
    },
    tags : {
        type : [String],
        default : []
    },
    likes : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }],
    dislikes : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }]

},{timestamps : true});


module.exports = mongoose.model('Video',videoSchema);