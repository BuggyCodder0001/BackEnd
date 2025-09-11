const redisClient = require('../config/redis');
const User = require('../models/user');
const validateUser = require('../utility/validateUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try{
        validateUser(req.body);

        const {firstName , emailId , password} = req.body;
        req.body.password = await bcrypt.hash(password,10);

        const user = await User.create(req.body);

        const token = jwt.sign({_id : user._id , emailId : emailId}, process.env.KEY , {expiresIn: 60*60});
        res.cookie('token' , token , {maxAge : 60*60*1000});
        res.status(201).send("User registered successfully");

    }
    catch(err){
        res.status(400).send("Error : "+err);
    }
}

const login = async (req,res) => {
    try{
        const {emailId , password} = req.body;

        if(!emailId){
            throw new Error("Invalid credentials");
        }

        if(!password){
            throw new Error("Invalid credentials");
        }

        const user = await User.findOne({emailId});

        const matchPassword = bcrypt.compare(password , user.password);

        if(!matchPassword){
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({_id : user._id , emailId : emailId}, process.env.KEY , {expiresIn: 60*60});
        res.cookie('token', token , {maxAge : 60*60*1000});

        res.status(200).send("User login successfull");
    }
    catch(err){
        res.status(401).send("Error : "+err);
    }
}

const logout = async (req,res) => {
    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);
        console.log(payload);
        
        await redisClient.set(`token ${token}`,"Blocked");
        await redisClient.expireAt(`token ${token}`,payload.exp);

        res.cookie("token" , null , {expires : new Date(Date.now())})

        res.send("User Logged out successfuly");
    }
    catch(err){
        res.status(503).send("Error : "+err);
    }
}
module.exports = {register,login , logout};