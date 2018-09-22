const router = require('express').Router();
const { newsListCtrl } = require('../controllers');

router.get('/', newsListCtrl.getAll);

router.get('/:id', newsListCtrl.get);

router.post('/', newsListCtrl.create);

router.patch('/:id', newsListCtrl.update);

router.delete('/:id', newsListCtrl.delete);
module.exports = router;
