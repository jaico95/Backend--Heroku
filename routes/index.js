const router = require('express').Router();
const apiRouterUser = require('./api/users');
router.use('/auth', apiRouterUser);

module.exports = router;