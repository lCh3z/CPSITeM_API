const router = require('express').Router();
const { cupponCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', cupponCtrl.getAll);

router.get('/:id', cupponCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          code: 'word,required',
          discount: 'unsigned,required',
          description: 'word,required',
        },
      });
    },
  ], cupponCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          code : 'word,required',
          discount: 'unsigned,required',
          description: 'word,required',
          status: 'unsigned,required',
        },
      });
    },
  ], cupponCtrl.update);

router.delete('/:id', cupponCtrl.delete);
module.exports = router;
