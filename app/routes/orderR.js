const router = require('express').Router();
const { orderCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', orderCtrl.getAll);

router.get('/:id', orderCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_user: 'unsigned,required',
          id_address: 'unsigned,required',
          id_payment: 'unsigned,required',
          id_cuppon: 'unsigned',
          list_prod:[
            {
              id_order: 'unsigned',
              id_product: 'unsigned',
              quantity: 'unsigned',
              price: 'unsigned',
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
          id: 'unsigned',
          id_user: 'unsigned,required',
          id_address: 'unsigned,required',
          id_payment: 'unsigned,required',
          id_cuppon: 'unsigned',
          status: 'unsigned',
        },
      });
    },
  ], orderCtrl.update);

router.delete('/:id', orderCtrl.delete);
module.exports = router;
