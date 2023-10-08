var express = require('express');
var router = express.Router();
var userController = require('../controllers/user/user');

//Create  And Update User 
router.post('/create',userController.create)
//Get All Users
router.get('/view',userController.getUsers)
//Delete User
router.delete('/delete/:id?', userController.deleteUser);
module.exports = router;
