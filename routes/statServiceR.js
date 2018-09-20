const router = require('express').Router();
const { statServiceCtrl } = require('../controllers');

router.get('/', statServiceCtrl.getAll);

router.get('/:id', statServiceCtrl.get);

router.post('/', statServiceCtrl.create);

router.patch('/:id', statServiceCtrl.update);

router.delete('/:id', statServiceCtrl.delete);
module.exports = router;
