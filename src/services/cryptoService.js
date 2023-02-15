const Crypto = require('../models/Crypto');

exports.createCrypto = (name, image, price, description, paymentMethod, owner) => Crypto.create({name, image, price, description, paymentMethod, owner});