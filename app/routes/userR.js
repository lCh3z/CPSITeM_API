const router = require('express').Router();
const { userCtrl, cartCtrl, wishListCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', userCtrl.getAll);

router.get('/:id', userCtrl.get);

/**
 *
 * Route to obtain all the user depending on
 * the received response with a notFound error or send the received data, catch to error
 * and calls the next with the error
 * @param  {Request Object}     req   Request to the function, includes information in params
 * @param  {Response Object}    res   Response than will give the function
 * @param  {Next Object}        next  In case of be necessary go by a other the work or
 *                                    if spawn a error
 * @return {Promise}                  Promise to return the data results
 * @version 16/10/2018
 */
router.post('/',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          cdu: 'required,password',
          main_email: 'email,required',
        },
      });
    },
  ],
  userCtrl.create);

  /**
   *
   * Route to put all the user according to.
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
          photo: 'image',
          name: 'word,required',
          sec_name: 'word',
          pat_surname: 'word,required',
          mat_surname: 'word',
          company: 'word',
          rfc: 'rfc,required',
          cfdi: 'unsigned,required',
          status: 'unsigned,required',
          type: 'string,required',
          country: 'string,required',
          lada: 'string,required',
          phone: 'string,required',
          cdu: 'password',
          cfdi: 'integer',
          type: 'string',
          status: 'unsigned',
          main_email: 'email,required',
          list_email: [
            {
              email: 'email,required',
            },
          ],
          worker: {
            position: 'word',
            depart: 'word',
          },
          list_addresses: [
            {
              street: 'string',
            },
          ],
        },
      });
    },
  ],
  userCtrl.update);

router.delete('/:id', userCtrl.delete);

router.get('/:id/cart', cartCtrl.getAll);

/**
 *
 * Route to obtain all the user depending on
 * the response received by the category
 * and calls the next with the error
 * @param  {Request Object}     req   Request to the function, includes information in params
 * @param  {Response Object}    res   Response than will give the function
 * @param  {Next Object}        next  In case of be necessary go by a other the work or
 *                                    if spawn a error
 * @return {Promise}                  Promise to return the data results
 * @version 16/10/2018
 */
router.post('/:id/cart',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next, {
        body: {
          id_product: 'unsigned,required',
          quantity: 'unsigned,required',
        },
      });
    },
  ], cartCtrl.create);

  /**
   *
   * Route to put all the user according to.
   * the response received by the category
   * and calls the next with the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise}                  Promise to return the data results
   * @version 16/10/2018
   */
router.put('/:id/cart/:id_product',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          quantity: 'unsigned,required',
          status: 'unsigned,required',
        },
      });
    },
  ], cartCtrl.update);

router.delete('/:id/cart/:id_product', cartCtrl.delete);

router.get('/:id/wishlist', wishListCtrl.getAll);

/**
 *
 * Route to obtain all the user depending on
 * The response received by the wish list.
 * and calls the next with the error
 * @param  {Request Object}     req   Request to the function, includes information in params
 * @param  {Response Object}    res   Response than will give the function
 * @param  {Next Object}        next  In case of be necessary go by a other the work or
 *                                    if spawn a error
 * @return {Promise}                  Promise to return the data results
 * @version 16/10/2018
 */
router.post('/:id/wishlist/',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_product: 'unsigned,required',
        },
      });
    },
  ], wishListCtrl.create);

router.delete('/:id/wishlist/:id_product', wishListCtrl.delete);

module.exports = router;
