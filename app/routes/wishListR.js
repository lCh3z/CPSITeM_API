const router = require('express').Router();
const { wishListCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', wishListCtrl.getAll);

router.post('/', wishListCtrl.create);

router.put('/:id_user', wishListCtrl.update);

router.delete('/:id_user', wishListCtrl.delete);

module.exports = router;
