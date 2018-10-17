const router = require('express').Router();
const { orderCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', orderCtrl.getAll);

router.get('/:id', orderCtrl.get);

router.post('/', orderCtrl.create);

router.put('/:id', orderCtrl.update);

router.delete('/:id', orderCtrl.delete);
module.exports = router;
