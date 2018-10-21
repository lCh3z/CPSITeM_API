const router = require('express').Router();
const { serviceCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', serviceCtrl.getAll);

router.get('/:id', serviceCtrl.get);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_seller: 'unsigned,required',
          id_user: 'unsigned,required',
          hospital: 'string,required',
          type: 'string',
          equipment: 'string',
          model: 'string',
          serial: 'string',
          location: 'string',
          contract: 'unsigned',
          description: 'string',
          voucher: 'string',
          stat_service: [
            {
              title: 'string',
              description: 'string',
              materials: 'string',
              observations: 'string',
              imgs: [
                {
                  photo: 'image',
                },
              ],
            },
          ],
        },
      });
    },
  ], serviceCtrl.create);

router.put('/:id',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_seller: 'unsigned,required',
          id_user: 'unsigned,required',
          hospital: 'string,required',
          type: 'string',
          equipment: 'string',
          model: 'string',
          serial: 'string',
          location: 'string',
          contract: 'unsigned',
          description: 'string',
          voucher: 'string',
          status: 'unsigned',
          stat_service: [
            {
              title: 'string',
              description: 'string',
              materials: 'string',
              observations: 'string',
              imgs: [
                {
                  photo: 'image',
                },
              ],
            },
          ],
        },
      });
    },
  ], serviceCtrl.update);

router.delete('/:id', serviceCtrl.delete);
module.exports = router;
