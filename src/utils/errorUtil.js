const mongoose = require('mongoose');

function getFirstMongooseError(error) {
    //gets all the error messages but returnes ONLY the first one
    //const errorsArray = Object.keys(error.errors).map(key => error.errors[key].message);
    //return errorsArray[0];

    //gets and returns ONLY the first error
    const firstError = Object.values(error.errors)[0].message;
    return firstError;
}

exports.getErrorMessage = (error) => {
    switch (error.name) {
        case 'Error':
            return error.message;
        case 'ValidationError':
            return getFirstMongooseError(error);
        default:
            return error.message;
    }
};