const router = require('express').Router();
const { notificationCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', notificationCtrl.getAll);

router.get('/:id', notificationCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          title: 'string, required',
          cont: 'string, required',
          id_user: 'unsignedInteger, required',
        },
      });
    },
  ], notificationCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          title: 'string, required',
          cont: 'string, required',
          id_user: 'unsignedInteger, required',
        },
      });
    },
  ], notificationCtrl.update);

router.delete('/:id', notificationCtrl.delete);
module.exports = router;
