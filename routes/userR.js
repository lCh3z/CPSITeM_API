const router = require('express').Router();
const { userCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', userCtrl.getAll);

router.get('/:id', userCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      main_email: 'email,required',
    },
  });
}, userCtrl.create);

router.patch('/:id', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      main_email: 'email,required',
    },
  });
}, userCtrl.update);

router.delete('/:id', userCtrl.delete);
module.exports = router;
