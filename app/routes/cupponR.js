const router = require('express').Router();
const { cupponCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', cupponCtrl.getAll);

router.get('/:id', cupponCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          code: 'word, required',
          discount: 'unsignedInteger, required',
          description: 'word, required',
        },
      });
    },
  ], cupponCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          code : 'word, required',
          discount: 'unsignedInteger, required',
          description: 'word, required',
          status: 'unsignedInteger, required',
        },
      });
    },
  ], cupponCtrl.update);

router.delete('/:id', cupponCtrl.delete);
module.exports = router;
