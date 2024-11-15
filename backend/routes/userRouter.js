const express =  require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController')

userRouter.post('/signup',userController.createUser)
userRouter.post('/login', userController.login)

module.exports = userRouter;