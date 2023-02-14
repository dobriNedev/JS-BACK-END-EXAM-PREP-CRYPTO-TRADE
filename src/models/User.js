const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'], 
        minLength: 5
    },
    email: {
        type: String,
        required: [true, 'Email is required!'], 
    },
    password: {
        type: String,
        required: [true, 'Password is required!'], 
        minLength: 4
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;