const express = require('express');
const problemRouter = express.Router();
const adminMiddleWare = require('../middleware/adminMiddleware');

problemRouter.post('/create', adminMiddleWare, createProblem);
problemRouter.patch('/:id' , updateProblem);
problemRouter.delete('/:id' , deleteProblem);

problemRouter.get('/:id' , getProblemById);
problemRouter.get('/' , getAllProblem);
problemRouter.get('/user' , solvedAllProblembyUser);