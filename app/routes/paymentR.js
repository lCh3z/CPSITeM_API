const router = require('express').Router();
const { paymentCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', paymentCtrl.getAll);

router.get('/:id', paymentCtrl.get);

router.post('/', paymentCtrl.create);

router.put('/:id', paymentCtrl.update);

router.delete('/:id', paymentCtrl.delete);
module.exports = router;
