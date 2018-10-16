const router = require('express').Router();
const { configurationCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', configurationCtrl.getAll);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          label: 'string,required',
          value: 'string',
        },
      });
    },
  ], configurationCtrl.create);

router.post('/populate', configurationCtrl.populate);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          label: 'string,required',
          value: 'string',
          status: 'unsigned',
        },
      });
    },
  ], configurationCtrl.update);

router.delete('/:id', configurationCtrl.delete);

module.exports = router;
