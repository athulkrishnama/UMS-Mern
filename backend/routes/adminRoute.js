const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();
const auth = require('../middlewares/adminAuth')

adminRouter.post('/login', adminController.login);
adminRouter.get('/getUsers',auth.tokenChecker,adminController.getUsers)

module.exports = adminRouter;