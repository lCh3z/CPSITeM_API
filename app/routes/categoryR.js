const router = require('express').Router();
const { categoryCtrl } = require('../controllers');

router.get('/', categoryCtrl.getAll);

router.get('/:id', categoryCtrl.get);

router.post('/', categoryCtrl.create);

router.put('/:id', categoryCtrl.update);

router.delete('/:id', categoryCtrl.delete);
module.exports = router;
