const router = require('express').Router();
const { paymentCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, paymentCtrl.permits());
    },
  ], paymentCtrl.getAll);

router.get('/:id',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, paymentCtrl.permits());
    },
  ], paymentCtrl.get);

/**
 *
 * Route to obtain all the payment depending on
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
      middlewares.auth.havePermit(req, res, next, paymentCtrl.permits());
    },
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_user: 'unsigned,required',
          account: 'string,required',
          token: 'string,required',
        },
      });
    },
  ], paymentCtrl.create);

  /**
   *
   * Route to put all the payment according to.
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
      middlewares.auth.havePermit(req, res, next, paymentCtrl.permits());
    },
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_user: 'unsigned,required',
          account: 'string,required',
          token: 'string,required',
        },
      });
    },
  ], paymentCtrl.update);

router.delete('/:id',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, paymentCtrl.permits());
    },
  ], paymentCtrl.delete);
module.exports = router;
