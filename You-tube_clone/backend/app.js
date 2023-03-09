const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const videoRoutes = require('./routes/video');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth');

const app = express();
dotenv.config();

app.use(cookieParser());
//for json encoded data
app.use(bodyParser.json());


app.use((req,res,next) => {

    res.setHeader('Access-Control-Allow-Credentials','true');
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/videos',videoRoutes);
app.use(commentRoutes);

//error middleware
app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || 'Something Went Wrong!';
    res.status(status).json({
        message : message
    })
});

mongoose.connect(process.env.MONGOOSE).then(result => {
    console.log('Connected to db');
    app.listen(8080,() => {
        console.log('connected to server');
    });
}).catch(err => console.log(err));

