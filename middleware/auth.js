const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../services/logger');

exports.authenticate  = async(req,res,next) => {
    try{
        const token = req.header('Authorization');
        const id = jwt.verify(token, process.env.USER_SECRET);   //get decrypted user id json object
        const user = await User.findByPk(id.userId);
        if(user){
            req.user = user;
            next();
        }else{
            res.json({err: 'User not found'}).status(404);
        }
    }catch(err){
        logger.write(err.stack);
    }   
}

