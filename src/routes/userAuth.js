const express = require('express')
const authRouter = express.Router();
const {register , login , logout } = require('../controllers/uaerAuthent');
const userMiddleware = require('../middleware/userMiddleware');


authRouter.post('/register' , register); // user registration api
authRouter.post('/login' , login); // user login api
authRouter.post('/logout',userMiddleware,logout); // logout apli

module.exports = authRouter;