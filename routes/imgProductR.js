const router = require('express').Router();
const { imgProductCtrl } = require('../controllers');

router.get('/', imgProductCtrl.getAll);

router.get('/:id', imgProductCtrl.get);

router.post('/', imgProductCtrl.create);

router.patch('/:id', imgProductCtrl.update);

router.delete('/:id', imgProductCtrl.delete);
module.exports = router;
