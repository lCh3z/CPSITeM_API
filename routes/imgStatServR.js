const router = require('express').Router();
const { imgStatServCtrl } = require('../controllers');

router.get('/', imgStatServCtrl.getAll);

router.get('/:id_stat_serv', imgStatServCtrl.get);

router.post('/', imgStatServCtrl.create);

router.patch('/:id_stat_serv', imgStatServCtrl.update);

router.delete('/:id_stat_serv', imgStatServCtrl.delete);
module.exports = router;
