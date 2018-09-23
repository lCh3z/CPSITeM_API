const router = require('express').Router();
const { workerCtrl } = require('../controllers');

router.get('/', workerCtrl.getAll);

router.get('/:id', workerCtrl.get);

router.post('/', workerCtrl.create);

router.patch('/:id', workerCtrl.update);

router.delete('/:id', workerCtrl.delete);
module.exports = router;
