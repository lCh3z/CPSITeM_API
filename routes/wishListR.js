const router = require('express').Router();
const { wishListCtrl } = require('../controllers');

router.get('/', wishListCtrl.getAll);

router.post('/', wishListCtrl.create);

router.patch('/:id', wishListCtrl.update);

router.delete('/:id', wishListCtrl.delete);

module.exports = router;
