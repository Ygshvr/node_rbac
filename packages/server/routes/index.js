const router = require('express').Router();
const verifyJWTToken = require('../middleware/authentication');

router.use('/api/user', verifyJWTToken, require('./userRoute'))
router.use('/api/auth', require('./loginRoute'))
router.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router;