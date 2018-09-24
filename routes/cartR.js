const router = require('express').Router();
const { cartCtrl } = require('../controllers');

router.get('/', cartCtrl.getAll);

router.post('/', cartCtrl.create);

router.patch('/:id_user', cartCtrl.update);

router.delete('/:id_user', cartCtrl.delete);
module.exports = router;
