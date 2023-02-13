const express = require('express');
const Router = express.Router;
const router = Router();

//TO DO: import controllers
const homeController = require('../controllers/homeController');
//TO DO: Endpoints and actions 

//HOME
router.get('/', homeController.getHome);
//AUTH
//Login

//Register

//Logout

//OTHER

module.exports = router;
