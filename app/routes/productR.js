const router = require('express').Router();
const { productCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', productCtrl.getAll);

router.get('/:id', productCtrl.get);

router.post('/', [
  (req, res, next) => {
    middlewares.validator.validate(req, res, next, {
      body: {
        id_cat: 'required,unsigned',
        name: 'required,string',
        inventory: 'required,unsigned',
        price: 'required,unsigned',
        description: 'required,string',
        specs: 'required,string',
        min_quan: 'required,unsigned',
        list_imgs: [
          {
            photo: 'required,image',
          },
        ],
      },
    });
  },
], productCtrl.create);

router.put('/:id',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_cat: 'required,unsigned',
          name: 'required,string',
          inventory: 'required,unsigned',
          price: 'required,unsigned',
          description: 'required,string',
          specs: 'required,string',
          min_quan: 'required,unsigned',
          list_imgs: [
            {
              photo: 'required,image',
            },
          ],
        },
      });
    },
  ], productCtrl.update);

router.delete('/:id', productCtrl.delete);
module.exports = router;
