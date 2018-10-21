const router = require('express').Router();
const { notificationCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', notificationCtrl.getAll);

router.get('/:id', notificationCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          title: 'string,required',
          cont: 'string,required',
          id_user: 'unsigned,required',
        },
      });
    },
  ], notificationCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          title: 'string,required',
          cont: 'string,required',
          id_user: 'unsigned,required',
        },
      });
    },
  ], notificationCtrl.update);

router.delete('/:id', notificationCtrl.delete);
module.exports = router;
