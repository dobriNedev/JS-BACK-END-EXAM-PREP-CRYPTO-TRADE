const mongoose = require('mongoose');
const { DB_URI } = require('./constants');

async function initDB() {
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(DB_URI);
        console.log('MongoDB connected successfuly!');
    } catch (error) {
        console.log('Not abble to connect to MongoDB:');
        console.error(error);
    }
}

module.exports = initDB;