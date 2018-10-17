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
        id_cat: 'required',
        name: 'required',
        inventory: 'required',
        price: 'required',
        description: 'required',
        list_imgs: [
          {
            photo: 'required',
          },
        ],
      },
    });
  },
], productCtrl.create);

router.put('/:id', productCtrl.update);

router.delete('/:id', productCtrl.delete);
module.exports = router;
