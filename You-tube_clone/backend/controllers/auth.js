const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.Signup = (req,res,next) => {

    const body = req.body;
    const email = body.email;
    const name = body.name;
    const password = body.password;

    bcrypt.hash(password,12).then(hashedPassword => {
        
        const user = new User({
            email : email,
            name : name,
            password : hashedPassword
        });

        return user.save();
    }).then(result => {

        res.status(201).json({
            message : 'User Created',
            data : result
        });
    }).catch(err => {
        next(err);f
    });
}

exports.Signin = (req,res,next) => {

    const body = req.body;
    const email = body.email;
    const password = body.password;

    let user;

    User.findOne({email : email})
    .then(userDoc => {

        if(!userDoc) {
            const error = new Error('No user with this Email');
            error.status = 401;
            throw error;
        }

        user = userDoc;
        return bcrypt.compare(password,user.password);
    })
    .then(isValid => {

        if(!isValid) {
            const error = new Error("Password didn't match!");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({
            email : email,
            userId : user._id.toString()
        },process.env.JWT);

        
        const {password , ...others} = user._doc;
        res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200).json({
            message : 'Login Successful!',
            user : others,
            token : token
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.signInWithGoogle = (req,res,next) => {
    
    const body = req.body;

    User.findOne({email : body.email})
    .then(userDoc => {

        if(!userDoc) {
            const user = new User({
                name : body.name,
                email : body.email,
                img : body.img,
                fromGoogle : true
            });

            return user.save();
        }
        
        //in case the account is already there, simply return the user doc
        return Promise.resolve(userDoc);
    })
    .then(user => {

        const token = jwt.sign({
            email : req.body.email,
            userId : user._id.toString()
        },process.env.JWT);

        
        const {password , ...others} = user._doc;
        res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200).json({
            message : 'Google Sign In Successful!',
            user : others,
            token : token
        });
    })
    .catch(err => {
        next(err);
    })


}