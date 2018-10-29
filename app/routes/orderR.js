const router = require('express').Router();
const { orderCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', orderCtrl.getAll);

router.get('/:id', orderCtrl.get);

/**
 *
 * Route to obtain all the order depending on
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
          id_user: 'unsigned,required',
          id_address: 'unsigned,required',
          id_payment: 'unsigned,required',
          id_cuppon: 'unsigned',
          list_prod: [
            {
              id_product: 'unsigned',
              quantity: 'unsigned',
              price: 'unsigned',
            }
          ],
        },
      });
    },
  ], orderCtrl.create);

  /**
   *
   * Route to put all the order according to.
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
          id: 'unsigned',
          id_user: 'unsigned,required',
          id_address: 'unsigned,required',
          id_payment: 'unsigned,required',
          id_cuppon: 'unsigned',
          status: 'unsigned',
          list_prod: [
            {
              id_order: 'unsigned',
              id_product: 'unsigned',
              quantity: 'unsigned',
              price: 'unsigned',
            }
          ],
        },
      });
    },
  ], orderCtrl.update);

router.delete('/:id', orderCtrl.delete);
module.exports = router;
