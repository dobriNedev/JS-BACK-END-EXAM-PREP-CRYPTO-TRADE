const { COOKIE_TOKEN_NAME, SECRET } = require('../config/constants');
const jwt = require('../utils/jwtUtil');

exports.authenticate = async(req, res, next) => {
    const token = req.cookies[COOKIE_TOKEN_NAME];

    if (token) {
        try {
            const decodedToken = await jwt.jwtVerify(token, SECRET);
            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;
        } catch (error) {
            res.clearCookie(COOKIE_TOKEN_NAME);
            res.status(401).render('404');
        }
    }

    next();
};

exports.isAuthenticated = async(req, res, next) => {
    if (!req.user) {
        return res.status(401).redirect('/login');
    }

    next();
}