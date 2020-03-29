const router = require('express').Router();
const user = require('../models/User');

router.get('/:userId', async (req, res) => {
    try {
        let userData = await user.getUserById(req.query.userId);
        console.log('MyUser',userData);
        res.status(200).send(userData);
    } catch (error) {
        console.log(error)
        res.status(404).send(error.message);
    }
})

router.post('/', async (req, res) => {
    try {
        let response = await user.createUser(req.body)
        console.log(response)
        res.status(200).send(response);
    }
    catch(err) {
        if(err.message) {
            res.status(500).send(err.message);
        } else {
            res.status(500).send(err);
        }
    }
})

module.exports = router;