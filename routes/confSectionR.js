const router = require('express').Router();
const { confSectionCtrl } = require('../controllers');

router.get('/', confSectionCtrl.getAll);

router.post('/', confSectionCtrl.create);

router.put('/:id_section', confSectionCtrl.update);

router.delete('/:id_section', confSectionCtrl.delete);
module.exports = router;
