const router = require('express').Router();
const { newsListCtrl } = require('../controllers');

router.get('/', newsListCtrl.getAll);

router.post('/', newsListCtrl.create);

router.put('/:email', newsListCtrl.update);

module.exports = router;
