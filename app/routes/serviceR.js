const router = require('express').Router();
const { serviceCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', serviceCtrl.getAll);

router.get('/:id', serviceCtrl.get);

/**
 *
 * Route to obtain all the service depending on
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
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_seller: 'unsigned,required',
          id_user: 'unsigned,required',
          hospital: 'string,required',
          type: 'string',
          equipment: 'string',
          model: 'string',
          serial_ :'string',
          location: 'string',
          contract: 'unsigned',
          description: 'string',
          voucher: 'string',
        },
      });
    },
  ], serviceCtrl.create);

  /**
   *
   * Route to put all the service according to.
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
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_seller: 'unsigned,required',
          id_user: 'unsigned,required',
          hospital: 'string,required',
          type: 'string',
          equipment: 'string',
          model: 'string',
          serial_ :'string',
          location: 'string',
          contract: 'unsigned',
          description: 'string',
          voucher: 'string',
          status:'unsigned',
        },
      });
    },
  ], serviceCtrl.update);

router.delete('/:id', serviceCtrl.delete);
module.exports = router;
