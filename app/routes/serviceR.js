const router = require('express').Router();
const { serviceCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', serviceCtrl.getAll);

router.get('/:id', serviceCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_seller: 'unsignedInteger, required',
          id_user: 'unsignedInteger, required',
          hospital: 'string, required',
          type: 'string',
          equipment: 'string',
          model: 'string',
          serial_ :'string',
          location: 'string',
          contract: 'unsignedInteger',
          description: 'string',
          voucher: 'string',
        },
      });
    },
  ], serviceCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_seller: 'unsignedInteger, required',
          id_user: 'unsignedInteger, required',
          hospital: 'string, required',
          type: 'string',
          equipment: 'string',
          model: 'string',
          serial_ :'string',
          location: 'string',
          contract: 'unsignedInteger',
          description: 'string',
          voucher: 'string',
          status:'unsignedInteger',
        },
      });
    },
  ], serviceCtrl.update);

router.delete('/:id', serviceCtrl.delete);
module.exports = router;
