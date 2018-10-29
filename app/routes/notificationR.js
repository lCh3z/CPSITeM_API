const router = require('express').Router();
const { notificationCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, notificationCtrl.permits());
    },
  ], notificationCtrl.getAll);

router.get('/:id', notificationCtrl.get);

/**
 *
 * Route to obtain all the notification depending on
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
      middlewares.auth.havePermit(req, res, next, notificationCtrl.permits());
    },
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          title: 'string,required',
          cont: 'string,required',
          id_user: 'unsigned,required',
        },
      });
    },
  ], notificationCtrl.create);

  /**
   *
   * Route to put all the notification according to.
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
      middlewares.auth.havePermit(req, res, next, notificationCtrl.permits());
    },
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          title: 'string,required',
          cont: 'string,required',
          id_user: 'unsigned,required',
        },
      });
    },
  ], notificationCtrl.update);

router.delete('/:id',
  [
    middlewares.auth.isLogged,
    (req, res, next) => {
      middlewares.auth.havePermit(req, res, next, notificationCtrl.permits());
    },
  ], notificationCtrl.delete);
module.exports = router;
