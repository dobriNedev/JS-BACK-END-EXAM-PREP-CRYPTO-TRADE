const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtil');

exports.getAllCrypto = async(req, res) => {
    res.render('catalog');
};

exports.getCreateOffer = (req, res) => {
    res.render('create')
};

exports.postCreateOffer = async(req, res) => {
    const { name, image, price, description, paymentMethod } = req.body;
    const ownerId = res.locals.user._id;
   
    try {
        await cryptoService.createCrypto(name, image, price, description, paymentMethod, ownerId);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.status(401).render('create', { error: getErrorMessage(error) });
    };
};