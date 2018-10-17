const router = require('express').Router();
const { serviceCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', serviceCtrl.getAll);

router.get('/:id', serviceCtrl.get);

router.post('/', serviceCtrl.create);

router.put('/:id', serviceCtrl.update);

router.delete('/:id', serviceCtrl.delete);
module.exports = router;
