const router = require('express').Router();
const { workerCtrl } = require('../controllers');

router.get('/', workerCtrl.getAll);

router.get('/:id_user', workerCtrl.get);

router.post('/', workerCtrl.create);

router.put('/:id_user', workerCtrl.update);

router.delete('/:id_user', workerCtrl.delete);
module.exports = router;
