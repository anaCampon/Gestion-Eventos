const router = require('express').Router();
const event = require('../../controllers/event.controller');
const {checkToken } = require ('../../middleware/auth');

//Todas las rutas event están protegidas con JWT
//Consultas avanzadas
router.get('/', checkToken, event.getBySport);
router.get('/date', checkToken, event.getByDate);
router.get('/upcoming', checkToken, event.getAllByDate);

//Consultas generales
router.get('/', checkToken, event.getAll);
router.get('/:id', checkToken, event.getById);
router.post('/', checkToken, event.createEvent);
router.put('/:id', checkToken, event.updateEvent);
router.delete('/:id', checkToken, event.dropEvent);



module.exports = router;