const router = require('express').Router();
const { confSectionCtrl } = require('../controllers');

router.get('/', confSectionCtrl.getAll);

router.post('/', confSectionCtrl.create);

router.patch('/:id', confSectionCtrl.update);

router.delete('/:id', confSectionCtrl.delete);
module.exports = router;
