const Crypto = require('../models/Crypto');

exports.createCrypto = (name, image, price, description, paymentMethod, owner) => Crypto.create({name, image, price, description, paymentMethod, owner});

exports.getAllCrypto = () => Crypto.find();

exports.findOneById = (id) => Crypto.findById(id);

exports.buyCrypto = async(cryptoId, buyerId) => {
    //2 DB requests
    // const crypto = await this.findOneById(cryptoId);
    // crypto.buyers.push(buyerId);
    // await crypto.save();

    //1 DB request
    await Crypto.findByIdAndUpdate(cryptoId, {$push: {buyers: buyerId}});
};

exports.deleteCrypto = (id) => Crypto.findByIdAndDelete(id);

