//rutas
const router = require('express').Router();
const user = require('../../controllers/user.controller');
const {checkToken } = require ('../../middleware/auth');


router.post('/register', user.register);
router.post('/login', user.login);
router.get('/profile',checkToken , user.profile);

module.exports = router;
