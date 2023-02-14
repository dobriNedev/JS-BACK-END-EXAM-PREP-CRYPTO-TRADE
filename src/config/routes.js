const express = require('express');
const Router = express.Router;
const router = Router();

//TO DO: import controllers
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const cryptoController = require('../controllers/cryptoContorller');
const { isAuthenticated }= require('../middleware/authMiddleware');
//TO DO: Endpoints and actions 

//HOME
router.get('/', homeController.getHome);
//AUTH-USER
//Login
router.get('/users/login', userController.getLogin);
router.post('/users/login', userController.postLogin);
//Register
router.get('/users/register', userController.getRegister);
router.post('/users/register', userController.postRegister);
//Logout
router.get('/users/logout', isAuthenticated,  userController.getLogout);
//CRYPTO
router.get('/crypto/catalog', cryptoController.getAllCrypto);
router.get('/crypto/createOffer',isAuthenticated, cryptoController.getCreateOffer);
//OTHER

module.exports = router;
