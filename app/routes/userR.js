const router = require('express').Router();
const { userCtrl, cartCtrl, wishListCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, userCtrl.permits());
    },
  ], userCtrl.getAll);

router.get('/:id',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, userCtrl.permits());
    },
  ], userCtrl.get);

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
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, userCtrl.permits());
    },
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
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, userCtrl.permits());
    },
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          photo: 'image',
          name: 'word,required',
          sec_name: 'word',
          pat_surname: 'word',
          mat_surname: 'word',
          company: 'word',
          rfc: 'rfc',
          country: 'string',
          lada: 'string',
          phone: 'string',
          cdu: 'password',
          cfdi: 'integer',
          type: 'string',
          status: 'unsigned',
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

router.delete('/:id',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, userCtrl.permits());
    },
  ], userCtrl.delete);

router.get('/:id/cart',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, cartCtrl.permits());
    },
  ], cartCtrl.getAll);

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
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, cartCtrl.permits());
    },
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next, {
        body: {
          id_product: 'unsigned,required',
          quantity: 'unsigned',
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
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, cartCtrl.permits());
    },
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          quantity: 'unsigned',
          status: 'unsigned',
        },
      });
    },
  ], cartCtrl.update);

router.delete('/:id/cart/:id_product',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, cartCtrl.permits());
    },
  ], cartCtrl.delete);

router.get('/:id/wishlist',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, wishListCtrl.permits());
    },
  ], wishListCtrl.getAll);

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
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, wishListCtrl.permits());
    },
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_product: 'unsigned,required',
        },
      });
    },
  ], wishListCtrl.create);

router.delete('/:id/wishlist/:id_product',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, wishListCtrl.permits());
    },
  ], wishListCtrl.delete);

module.exports = router;
