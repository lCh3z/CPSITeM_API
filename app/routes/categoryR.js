const router = require('express').Router();
const { categoryCtrl } = require('../controllers');

router.get('/', categoryCtrl.getAll);

router.get('/:id', categoryCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          name: 'word, required',
          description: 'string, required',
          photo: 'photo',
        },
      });
    },
  ], categoryCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          name: 'word, required',
          description: 'string, required',
          photo: 'photo',
          status: 'unsignedInteger',
        },
      });
    },
  ], categoryCtrl.update);

router.delete('/:id', categoryCtrl.delete);
module.exports = router;
