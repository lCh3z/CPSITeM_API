const router = require('express').Router();
const { orderCtrl } = require('../controllers');

router.get('/', orderCtrl.getAll);

router.get('/:id', orderCtrl.get);

router.post('/', orderCtrl.create);

router.patch('/:id', orderCtrl.update);

router.delete('/:id', orderCtrl.delete);
module.exports = router;
