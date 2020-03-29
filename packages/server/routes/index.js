const router = require('express').Router();

router.use('/api/user', require('./user'))
router.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router;