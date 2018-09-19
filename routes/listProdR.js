const router = require('express').Router();
const { listProdCtrl } = require('../controllers');

router.get('/', listProdCtrl.getAll);

router.post('/', listProdCtrl.create);

router.patch('/:id', listProdCtrl.update);

router.delete('/:id', listProdCtrl.delete);
module.exports = router;
