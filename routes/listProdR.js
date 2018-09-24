const router = require('express').Router();
const { listProdCtrl } = require('../controllers');

router.get('/', listProdCtrl.getAll);

router.post('/', listProdCtrl.create);

router.patch('/:id_order', listProdCtrl.update);

router.delete('/:id_order', listProdCtrl.delete);
module.exports = router;
