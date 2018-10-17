const router = require('express').Router();
const { userCtrl, cartCtrl, wishListCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', userCtrl.getAll);

router.get('/:id', userCtrl.get);

router.post('/',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          main_email: 'email,required',
        },
      });
    },
  ],
  userCtrl.create);

router.put('/:id',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          name: 'word,required',
          main_email: 'email,required',
          list_email: [
            {
              email: 'email',
            },
          ],
          worker: {
            position: 'word',
            depart: 'word',
          },
        },
      });
    },
  ],
  userCtrl.update);

router.delete('/:id', userCtrl.delete);

router.get('/:id/cart', cartCtrl.getAll);

router.post('/:id/cart', cartCtrl.create);

router.put('/:id/cart/:id_product', cartCtrl.update);

router.delete('/:id/cart/:id_product', cartCtrl.delete);

router.get('/:id/wishlist', wishListCtrl.getAll);

router.post('/:id/wishlist/', wishListCtrl.create);

router.delete('/:id/wishlist/:id_product', wishListCtrl.delete);

module.exports = router;
