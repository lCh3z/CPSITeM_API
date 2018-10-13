const router = require('express').Router();
const { orderCtrl } = require('../controllers');

router.get('/', orderCtrl.getAll);

router.get('/:id', orderCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_user: 'unsignedInteger, required',
          id_address: 'unsignedInteger, required',
          id_payment: 'unsignedInteger, required',
          id_cuppon: 'unsignedInteger',
          list_prod:[
            {
              id_order: 'unsignedInteger',
              id_product: 'unsignedInteger',
              quantity: 'unsignedInteger',
              price: 'unsignedInteger',
            }
          ],
        },
      });
    },
  ], orderCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id: 'unsignedInteger',
          id_user: 'unsignedInteger, required',
          id_address: 'unsignedInteger, required',
          id_payment: 'unsignedInteger, required',
          id_cuppon: 'unsignedInteger',
          status: 'unsignedInteger',
        },
      });
    },
  ], orderCtrl.update);

router.delete('/:id', orderCtrl.delete);
module.exports = router;
