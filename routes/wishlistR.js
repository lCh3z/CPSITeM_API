const router = require('express').Router();
const { wishlistCtrl } = require('../controllers');

router.get('/', wishlistCtrl.getAll);

router.post('/', wishlistCtrl.create);

router.patch('/:id', wishlistCtrl.update);

router.delete('/:id', wishlistCtrl.delete);

module.exports = router;
