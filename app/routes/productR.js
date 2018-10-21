const router = require('express').Router();
const { productCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', productCtrl.getAll);

router.get('/:id', productCtrl.get);

/**
 *
 * Route to obtain all the product depending on
 * the received response with a notFound error or send the received data, catch to error
 * and calls the next with the error
 * @param  {Request Object}     req   Request to the function, includes information in params
 * @param  {Response Object}    res   Response than will give the function
 * @param  {Next Object}        next  In case of be necessary go by a other the work or
 *                                    if spawn a error
 * @return {Promise}                  Promise to return the data results
 * @version 16/10/2018
 */
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

/**
 *
 * Route to put all the product according to.
 * the received response with a notFound error or send the received data, catch to error
 * and calls the next with the error
 * @param  {Request Object}     req   Request to the function, includes information in params
 * @param  {Response Object}    res   Response than will give the function
 * @param  {Next Object}        next  In case of be necessary go by a other the work or
 *                                    if spawn a error
 * @return {Promise}                  Promise to return the data results
 * @version 16/10/2018
 */
router.put('/:id',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
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
  ], productCtrl.update);

router.delete('/:id', productCtrl.delete);
module.exports = router;
