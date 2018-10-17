const router = require('express').Router();
const { newsListCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', newsListCtrl.getAll);

router.post('/', newsListCtrl.create);

router.put('/:email', newsListCtrl.update);

module.exports = router;
