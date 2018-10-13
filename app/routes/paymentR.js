const router = require('express').Router();
const { paymentCtrl } = require('../controllers');

router.get('/', paymentCtrl.getAll);

router.get('/:id', paymentCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_user: 'unsignedInteger, required',
          account: 'string, required',
          token: 'string, required',
        },
      });
    },
  ], paymentCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_user: 'unsignedInteger, required',
          account: 'string, required',
          token: 'string, required',
        },
      });
    },
  ], paymentCtrl.update);

router.delete('/:id', paymentCtrl.delete);
module.exports = router;
