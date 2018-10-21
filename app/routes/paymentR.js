const router = require('express').Router();
const { paymentCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', paymentCtrl.getAll);

router.get('/:id', paymentCtrl.get);

router.post('/',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_user: 'unsigned,required',
          account: 'string,required',
          token: 'string,required',
        },
      });
    },
  ], paymentCtrl.create);

router.put('/:id',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_user: 'unsigned,required',
          account: 'string,required',
          token: 'string,required',
        },
      });
    },
  ], paymentCtrl.update);

router.delete('/:id', paymentCtrl.delete);
module.exports = router;
