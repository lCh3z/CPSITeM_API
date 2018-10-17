const router = require('express').Router();
const { wishListCtrl } = require('../controllers');

router.get('/', wishListCtrl.getAll);

/**
 *
 * Route to obtain all the wishList depending on
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
          id_product: 'unsigned,required',
        },
      });
    },
  ], wishListCtrl.create);

  /**
   *
   * Route to put all the wishList according to.
   * the received response with a notFound error or send the received data, catch to error
   * and calls the next with the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise}                  Promise to return the data results
   * @version 16/10/2018
   */
router.put('/:id_user',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          id_product: 'unsigned,required',
          status: 'unsigned',
        },
      });
    },
  ], wishListCtrl.update);

router.delete('/:id_user', wishListCtrl.delete);

module.exports = router;
