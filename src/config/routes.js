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
//Catalog
router.get('/crypto/catalog', cryptoController.getAllCrypto);
//Create
router.get('/crypto/createOffer',isAuthenticated, cryptoController.getCreateOffer);
router.post('/crypto/createOffer',isAuthenticated , cryptoController.postCreateOffer);
//Details
router.get('/crypto/:id/details', cryptoController.getDetails);
//Edit
router.get('/crypto/:id/edit', isAuthenticated, cryptoController.getEdit);
router.post('/crypto/:id/edit', isAuthenticated, cryptoController.postEdit);
//Delete
router.get('/crypto/:id/delete', isAuthenticated, cryptoController.deleteCrypto);
//Buy
router.get('/crypto/:id/buy', isAuthenticated, cryptoController.buyCrypto);
//Search
router.get('/crypto/search', cryptoController.getSearch);

//OTHER
router.get('*', homeController.allOtherRoutes);

module.exports = router;
