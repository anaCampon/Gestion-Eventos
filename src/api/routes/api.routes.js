
const router = require('express').Router();

router.use('/users', require('./api/user.route'));
router.use('/events', require('./api/event.route'));

module.exports = router;
