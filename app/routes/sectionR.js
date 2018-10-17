const router = require('express').Router();
const { sectionCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', sectionCtrl.getAll);

router.get('/:id', sectionCtrl.get);

router.post('/', sectionCtrl.create);

router.put('/:id', sectionCtrl.update);

router.delete('/:id', sectionCtrl.delete);
module.exports = router;
