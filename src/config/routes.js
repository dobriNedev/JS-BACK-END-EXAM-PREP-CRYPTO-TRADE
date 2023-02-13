const express = require('express');
const Router = express.Router;
const router = Router();

//TO DO: import controllers
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
//TO DO: Endpoints and actions 

//HOME
router.get('/', homeController.getHome);
//AUTH
//Login
router.get('/users/login', userController.getLogin);
//Register

//Logout

//OTHER

module.exports = router;
