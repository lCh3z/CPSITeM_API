const router = require('express').Router();
const { addressCtrl } = require('../controllers');

router.get('/', addressCtrl.getAll);

router.get('/:id', addressCtrl.get);

router.post('/', addressCtrl.create);

router.patch('/:id', addressCtrl.update);

router.delete('/:id', addressCtrl.delete);
module.exports = router;
