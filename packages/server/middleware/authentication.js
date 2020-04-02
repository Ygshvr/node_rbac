const jwt = require('jsonwebtoken');
const { secretKey } = require('../secrets');

function verifyJWTToken(req, res, next) {
    const token = req.headers["authorization"];
    if(!token) {
        return res.status(401).json({"message": "Please login to access this page."});
    }
    jwt.verify(token, secretKey, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(401).json({"message": "Unable to verify the token, please try logging in again."});
        }
        req.user = user;
        next();
    })
};

module.exports = verifyJWTToken;