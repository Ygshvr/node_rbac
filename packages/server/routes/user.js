const router = require('express').Router();
const User = require('../models/User');
 
async function getUserById(id) {
    try {
        let user = await User.findByPk(id);
        if(!user) {
            return new Error('User not found.');
        }
    }
    catch(err) {
        console.log(err);
    }
}

router.get('/', async (req, res) => {
    res.status(200).send();
})

module.exports = router;