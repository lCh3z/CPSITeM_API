const router = require('express').Router();
const { listEmailCtrl } = require('../controllers');

router.get('/', listEmailCtrl.getAll);

router.get('/:id', listEmailCtrl.get);

router.post('/', listEmailCtrl.create);

router.patch('/:id', listEmailCtrl.update);

router.delete('/:id', listEmailCtrl.delete);

module.exports = router;
