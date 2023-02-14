

exports.getAllCrypto = async(req, res) => {
    res.render('catalog');
};

exports.getCreateOffer = async(req, res) => {
    res.render('create')
};