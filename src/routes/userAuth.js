const express = require('express')
const AuthRouter = express.Router();
const {register , login} = require('../controllers/uaerAuthent');


AuthRouter.post('/register' , register); // User Registeration
AuthRouter.post('/login' , login); // user Login