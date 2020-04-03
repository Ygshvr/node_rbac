const jwt = require('jsonwebtoken');
const { secretKey } = require('../secrets');
const url = require('url');

function checkRole(req, user) {
    let api = url.parse(req.url).pathname;
    switch(true) {
        case /\/getAll\/?/.test(api):
            return user.role === 'ADMIN'
        case /\/\d+\/?/.test(api):
            let userId = api.split('/')[1];
            return user.role === 'ADMIN' || ( user.role === 'EMPLOYEE' && userId == user.id)
        default:
            return true; // for public APIs like login
    }
}

function verifyJWTToken(req, res, next) {
    const bearerToken = req.headers["authorization"];
    if(!bearerToken) {
        return res.status(401).json({"message": "Please login to access this page."});
    }
    let token = bearerToken.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(401).json({"message": "Unable to verify the token, please try logging in again."});
        }
        let isAllowedToAccess = checkRole(req, user)
        if(isAllowedToAccess) {
            req.user = user;
            next();
        }
        else
        {
            res.status(401).json({"message": "Access denied."})
        }
    })
};

module.exports = { verifyJWTToken, checkRole };