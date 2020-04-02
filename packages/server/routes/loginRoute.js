const router = require('express').Router();
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../secrets');

router.post('/login', async (req, res) => {
    try {
        let response = await user.loginUser(req.body.email, req.body.password)
        jwt.sign({
            name: response.name,
            email: response.email,
            role: response.role
        }
        , secretKey
        , (err, token) => {
            res.json({
                "token": token
            })
        })
    }
    catch(err) {
        console.log(err)
        res.status(401).json({'message': 'Username or password is incorrect.'});
    }
})

module.exports = router;