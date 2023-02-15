const { isAuthenticated } = require('../middleware/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtil');

exports.getAllCrypto = async (req, res) => {
    try {
        const crypto = await cryptoService.getAllCrypto().lean();

        res.render('catalog', { crypto });
    } catch (error) {
        res.status(404).render('catalog', { error: getErrorMessage(error) });
    }
};

exports.getCreateOffer = (req, res) => {
    res.render('create')
};

exports.postCreateOffer = async (req, res) => {
    const { name, image, price, description, paymentMethod } = req.body;
    const ownerId = res.locals.user._id;

    try {
        await cryptoService.createCrypto(name, image, price, description, paymentMethod, ownerId);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.status(401).render('create', { error: getErrorMessage(error) });
    };
};

exports.getDetails = async (req, res) => {
    const cryptoId = req.params.id;
    const currentUser = res.locals.user?._id;
    
    try {
        const crypto = await cryptoService.findOneById(cryptoId).populate('owner').populate('buyers').lean();
        
        const owner = crypto.owner._id;
       
        const isBuyer = crypto.buyers?.some(el => el._id == currentUser);
        
        let isOwner;
        if(currentUser) {
            if (currentUser == owner) {
                isOwner = true;
            }
        }
         
        res.render('details', { crypto, isAuth: currentUser, isOwner, isBuyer });
    } catch (error) {
        res.status(404).render('details', { error: getErrorMessage(error) });
    }
};

exports.buyCrypto = async(req, res) => {
    const cryptoId = req.params.id;
    const currentUserId = res.locals.user._id;
    try {
        await cryptoService.buyCrypto(cryptoId, currentUserId);
        res.redirect(`/crypto/${cryptoId}/details`);
    } catch (error) {
        console.log(error);
        res.status(400).render('catalog', { error: getErrorMessage(error) });
    }
};

exports.deleteCrypto = async(req, res) => {
    const cryptoId = req.params.id;
    try {
        await cryptoService.deleteCrypto(cryptoId);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.status(400).render('catalog', { error: getErrorMessage(error) });
    }
};

exports.getEdit = async(req, res) => {
    const cryptoId = req.params.id;
    try {
        const crypto = await cryptoService.findOneById(cryptoId).lean();
        const selectedPaymentMethod = crypto.paymentMethod;
        const options = await cryptoService.getOptions(selectedPaymentMethod);
        console.log(options)
        res.render('edit', { crypto , selectedPaymentMethod, options });
    } catch (error) {
        res.status(400).render('catalog', { error: getErrorMessage(error) });
    }
};
