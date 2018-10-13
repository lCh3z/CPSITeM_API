const router = require('express').Router();
const { wishListCtrl } = require('../controllers');

router.get('/', wishListCtrl.getAll);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_user: 'unsignedInteger, required',
          id_product: 'unsignedInteger, required',
        },
      });
    },
  ], wishListCtrl.create);

router.put('/:id_user',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_product: 'unsignedInteger, required',
          status: 'unsignedInteger',
        },
      });
    },
  ], wishListCtrl.update);

router.delete('/:id_user', wishListCtrl.delete);

module.exports = router;
