const router = require('express').Router();
const { configurationCtrl } = require('../controllers');

router.get('/', configurationCtrl.getAll);

router.post('/', configurationCtrl.create);

router.post('/populate', configurationCtrl.populate);

router.patch('/:id', configurationCtrl.update);

router.delete('/:id', configurationCtrl.delete);

module.exports = router;
