const jwt = require('jsonwebtoken');


// exports.jwtSign = util.promisify(jwt.sign);
exports.jwtSign = function(payload, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, function(err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

    return promise;
};