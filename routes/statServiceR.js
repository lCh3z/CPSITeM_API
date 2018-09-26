const router = require('express').Router();
const { statServiceCtrl } = require('../controllers');

router.get('/', statServiceCtrl.getAll);

router.get('/:id', statServiceCtrl.get);

router.post('/', statServiceCtrl.create);

router.put('/:id', statServiceCtrl.update);

router.delete('/:id', statServiceCtrl.delete);
module.exports = router;
