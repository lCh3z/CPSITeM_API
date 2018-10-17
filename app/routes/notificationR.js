const router = require('express').Router();
const { notificationCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', notificationCtrl.getAll);

router.get('/:id', notificationCtrl.get);

router.post('/', notificationCtrl.create);

router.put('/:id', notificationCtrl.update);

router.delete('/:id', notificationCtrl.delete);
module.exports = router;
