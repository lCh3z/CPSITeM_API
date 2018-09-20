const router = require('express').Router();
const { cartCtrl } = require('../controllers');

router.get('/', cartCtrl.getAll);

router.post('/', cartCtrl.create);

router.patch('/:id', cartCtrl.update);

router.delete('/:id', cartCtrl.delete);
module.exports = router;
