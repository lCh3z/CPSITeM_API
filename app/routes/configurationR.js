const router = require('express').Router();
const { configurationCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', configurationCtrl.getAll);

router.post('/', configurationCtrl.create);

router.post('/populate', configurationCtrl.populate);

router.put('/:id', configurationCtrl.update);

router.delete('/:id', configurationCtrl.delete);

module.exports = router;
