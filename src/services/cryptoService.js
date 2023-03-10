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

exports.getOptions = (selected) => Crypto.schema.path('paymentMethod').enumValues.filter(v => v !== selected);

exports.edit = (id, name, image, price, description, paymentMethod) => Crypto.findByIdAndUpdate(id, {name, image, price, description, paymentMethod});

exports.search = async(name, paymentMethod) => {
    let crypto = await this.getAllCrypto().lean();
    
    if (name) {
        crypto = crypto.filter(el => el.name.toLowerCase() == name)
    }

    if(paymentMethod) {
        crypto = crypto.filter(el => el.paymentMethod.toLowerCase() == paymentMethod)
    }

    return crypto;
};

