const router = require('express').Router();
const { wishListCtrl } = require('../controllers');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', wishListCtrl.getAll);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_user: 'unsigned,required',
          id_product: 'unsigned,required',
        },
      });
    },
  ], wishListCtrl.create);

router.put('/:id_user',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_product: 'unsigned,required',
          status: 'unsigned',
        },
      });
    },
  ], wishListCtrl.update);

router.delete('/:id_user', wishListCtrl.delete);

module.exports = router;
