const router = require('express').Router();
const { listEmailCtrl } = require('../controllers');

router.get('/', listEmailCtrl.getAll);

router.get('/:id_user', listEmailCtrl.get);

router.post('/', listEmailCtrl.create);

router.patch('/:id_user', listEmailCtrl.update);

router.delete('/:id_user', listEmailCtrl.delete);

module.exports = router;
