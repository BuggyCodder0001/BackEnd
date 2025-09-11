const express = require('express')
const authRouter = express.Router();
const {register , login , logout, adminRegister } = require('../controllers/uaerAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


authRouter.post('/register' , register); // user registration api
authRouter.post('/login' , login); // user login api
authRouter.post('/logout',userMiddleware,logout); // logout apli
authRouter.post('/admin/register',adminMiddleware,adminRegister); //admin registration api

module.exports = authRouter;