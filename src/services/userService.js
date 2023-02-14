const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtUtil');
const { SECRET, COOKIE_TOKEN_NAME } = require('../config/constants');

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, email, password, rePass ) => {
    if (password !== rePass) {
        throw new Error('Passwords missmatch!');
    }
    
    if (password.length < 4) {
        
        throw new Error('Password too short!');
    }

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists!');
    }

    const hashPass = await bcrypt.hash(password, 10);

    await User.create({ username, email, password:hashPass });
};

exports.login = async(email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password!');
    }
    
    const isPassValid = await bcrypt.compare(password, user.password);
    
    if (!isPassValid) {
        throw new Error('Invalid email or password!');
    }
    const payload = {
        _id: user._id,
        email,
        username: user.username
    };

    const token = await jwt.jwtSign(payload, SECRET)
    return token;
};

exports.logout = (req, res) => {
    res.clearCookie(COOKIE_TOKEN_NAME);
    res.redirect('/');
};