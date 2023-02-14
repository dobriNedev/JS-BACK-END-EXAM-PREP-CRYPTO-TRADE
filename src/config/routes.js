const express = require('express');
const Router = express.Router;
const router = Router();

//TO DO: import controllers
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const cryptoController = require('../controllers/cryptoContorller');
//TO DO: Endpoints and actions 

//HOME
router.get('/', homeController.getHome);
//AUTH-USER
//Login
router.get('/users/login', userController.getLogin);
//Register
router.get('/users/register', userController.getRegister);
//Logout
//CRYPTO
router.get('/crypto/catalog', cryptoController.getAllCrypto);
//OTHER

module.exports = router;
