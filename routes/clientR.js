const router = require('express').Router();
const { clientCtrl } = require('../controllers');

router.get('/', clientCtrl.getAll);

router.get('/:id', clientCtrl.get);

router.post('/', clientCtrl.create);

router.patch('/:id', clientCtrl.update);

router.delete('/:id', clientCtrl.delete);
module.exports = router;
