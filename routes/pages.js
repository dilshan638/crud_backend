var express = require('express');
var router = express.Router();

var pageController = require('../controllers/pages/pages');

//Create  And Update Page 
router.post('/create',pageController.create)
//Get All Pages
 router.get('/view',pageController.getPages)
//Delete Page
 router.delete('/delete/:id?', pageController.deletePage);

module.exports = router;
 
