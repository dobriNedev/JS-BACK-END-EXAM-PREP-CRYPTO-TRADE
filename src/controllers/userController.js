const userService = require('../services/userService');
const { COOKIE_TOKEN_NAME } = require('../config/constants');
const { getErrorMessage } = require('../utils/errorUtil');

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { username, email, password, rePass } = req.body;

    try {
        await userService.register(username, email, password, rePass);

        res.render('login');
    } catch (error) {
        res.status(401).render('register', { error: getErrorMessage(error) });
    }
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userService.login(email, password);

        res.cookie(COOKIE_TOKEN_NAME, token);
        res.redirect('/');
    } catch (error) {
        res.status(404).render('login', { error: getErrorMessage(error) });
    }
};

exports.getLogout = (req, res) => userService.logout(req, res);


