const router = require('express').Router();
const { imgProductCtrl } = require('../controllers');

router.get('/', imgProductCtrl.getAll);

router.get('/:id_prod', imgProductCtrl.get);

router.post('/', imgProductCtrl.create);

router.patch('/:id_prod', imgProductCtrl.update);

router.delete('/:id_prod', imgProductCtrl.delete);
module.exports = router;
