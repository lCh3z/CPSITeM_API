const router = require('express').Router();
const { paymentCtrl } = require('../controllers');

router.get('/', paymentCtrl.getAll);

router.get('/:id', paymentCtrl.get);

router.post('/', paymentCtrl.create);

router.patch('/:id', paymentCtrl.update);

router.delete('/:id', paymentCtrl.delete);
module.exports = router;
