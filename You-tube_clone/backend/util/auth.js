const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.cookies.access_token;

    if(!token) {
        const error = new Error('Not Logged In!');
        error.status = 401;
        throw error;
    }

    let decodedToken; 
    
    try {
        decodedToken = jwt.verify(token,process.env.JWT);
    }
    catch(err) {
        const error = new Error('Unauthorized to perform this action');
        error.status = 403;
        throw error;
    }
    
    req.userId = decodedToken.userId;
    next();
}

