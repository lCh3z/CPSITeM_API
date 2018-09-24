const router = require('express').Router();
const { wishListCtrl } = require('../controllers');

router.get('/', wishListCtrl.getAll);

router.post('/', wishListCtrl.create);

router.patch('/:id_user', wishListCtrl.update);

router.delete('/:id_user', wishListCtrl.delete);

module.exports = router;
