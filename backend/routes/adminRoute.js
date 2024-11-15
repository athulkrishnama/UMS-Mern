const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();
const auth = require('../middlewares/adminAuth')

adminRouter.post('/login', adminController.login);
adminRouter.get('/getUsers',auth.tokenChecker,adminController.getUsers)
adminRouter.post('/deleteUser', auth.tokenChecker, adminController.deleteUser)
adminRouter.post('/updateUser', auth.tokenChecker, adminController.updateUser)
adminRouter.post('/search', auth.tokenChecker, adminController.search)

module.exports = adminRouter;