const User = require("../models/user");
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

const userMiddleware = async (req,res,next) => {
    try{
        const {token} = req.cookies;

        if(!token){
            throw new Error("Token does not exist.");
        }

        const payload = jwt.verify(token , process.env.KEY);

        const {_id} = payload;
        if(!_id){
            throw new Error("Use _id is missing.");
        }

        const user = await User.findById(_id);

        if(!user){
            throw new Error("User does not exist.");
        }

        const isBlocked = await redisClient.exists(`token : ${token}`);
        if(isBlocked){
            throw new Error("Token is invalid.");
        }

        req.user = user;

        next();
    }
    catch(err){
        res.status(401).send("Error : "+err);
    }
}

module.exports = userMiddleware;