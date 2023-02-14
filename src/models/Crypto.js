const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'], 
        minLength: [2, 'Name is too short!']
    },
    image: {
        type: String,
        required: [true, 'Image Url is required!'], 
        match: [/^https?:\/\//i , 'Invalid image Url!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'], 
        minValue: [0, 'Price should be a positive number!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'], 
        minLength: [10, 'Description is too short!']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required!'], 
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});
const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;