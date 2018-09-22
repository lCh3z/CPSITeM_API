const router = require('express').Router();
const { serviceCtrl } = require('../controllers');

router.get('/', serviceCtrl.getAll);

router.get('/:id', serviceCtrl.get);

router.post('/', serviceCtrl.create);

router.patch('/:id', serviceCtrl.update);

router.delete('/:id', serviceCtrl.delete);
module.exports = router;
