var router = require('express').Router();

router.use('/account', require('./account'));
router.use('/customers', require('./customers'));

module.exports = router;