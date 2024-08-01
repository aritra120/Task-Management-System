const express = require('express');
const UserController = require('../controller/user');
const userRouter = express.Router();

userRouter.post('/login',UserController.login);
userRouter.post('/register', UserController.register);

module.exports = userRouter;