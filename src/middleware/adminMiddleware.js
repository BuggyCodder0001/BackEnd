const User = require('../models/user');
const jwt = require('jsonwebtoken')
const redisClient = require('../config/redis');

const adminMiddleware = async (req,res,next) => {
    try{
        const {token} = req.cookies;

        if(!token){
            throw new Error("token does not exist.");
        }

        const payload = jwt.verify(token,process.env.KEY);

        const {_id} = payload;
        if(!_id){
            throw new Error("Admin _id is missing.");
        }

        const user = await User.findById(_id);

        if(payload.role != 'admin'){
            throw new Error("Access Denied.");
        }

        if(!user){
            throw new Error("Admin does not exist.");
        }

        const isBlocked = await redisClient.exists(`token : ${token}`);
        
        if(isBlocked){
            throw new Error("Invalid Token")
        }

        req.user = user;

        next();
    }
    catch(err){
        res.status(401).send("Error : "+err);
    }
}

module.exports = adminMiddleware;