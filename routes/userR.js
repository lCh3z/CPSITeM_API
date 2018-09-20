const router = require('express').Router();
const { userCtrl } = require('../controllers');

router.get('/', userCtrl.getAll);

router.get('/:id', userCtrl.get);

router.post('/', userCtrl.create);

router.patch('/:id', userCtrl.update);

router.delete('/:id', userCtrl.delete);
module.exports = router;
