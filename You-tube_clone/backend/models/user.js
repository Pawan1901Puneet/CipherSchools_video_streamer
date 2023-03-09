const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    img : {
        type : String,
    },
    subscribers : {
        type : Number,
        default : 0,
    },
    subscribedUsers : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    fromGoogle : {
        type : Boolean,
        default : false
    }
},{timestamps : true});


module.exports = mongoose.model('User',userSchema);