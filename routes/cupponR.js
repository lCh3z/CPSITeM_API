const router = require('express').Router();
const { cupponCtrl } = require('../controllers');

router.get('/', cupponCtrl.getAll);

router.get('/:id', cupponCtrl.get);

router.post('/', cupponCtrl.create);

router.patch('/:id', cupponCtrl.update);

router.delete('/:id', cupponCtrl.delete);
module.exports = router;
