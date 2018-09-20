const router = require('express').Router();
const { imgStatServCtrl } = require('../controllers');

router.get('/', imgStatServCtrl.getAll);

router.get('/:id', imgStatServCtrl.get);

router.post('/', imgStatServCtrl.create);

router.patch('/:id', imgStatServCtrl.update);

router.delete('/:id', imgStatServCtrl.delete);
module.exports = router;
