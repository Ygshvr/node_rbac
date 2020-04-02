const router = require('express').Router();
const user = require('../models/User');

router.get('/getAll', async (req, res) => {
    try {
        let response = await user.getAllUsers()
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err)
        if(err.message) {
            res.status(500).json({'message': err.message});
        } else {
            res.status(500).json('Something went wrong, please try after sometime.');
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        let userData = await user.getUserById(req.params.id);
        res.status(200).json(userData);
    } catch (err) {
        console.log(err)
        res.status(404).json({'message': err.message});
    }
})

module.exports = router;