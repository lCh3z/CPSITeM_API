const router = require('express').Router();
const { userCtrl, cartCtrl, wishListCtrl } = require('../controllers');
const middlewares = require('../middlewares');

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
          name: 'word,required,minLength:3,maxLength:20',
          sec_name: 'word,minLength:3,maxLength:20',
          pat_surname: 'word,required,minLength:3,maxLength:35',
          mat_surname: 'word,minLength:3,maxLength:35',
          company: 'word,maxLength:84',
          rfc: 'rfc,required,maxLength:84',
          cfdi: 'unsigned,required',
          status: 'unsigned',
          type: 'string,required,maxLength:12',
          country: 'string,required,maxLength:5',
          lada: 'string,required,maxLength:3',
          phone: 'string,required,length:8',
          cdu: 'password',
          main_email: 'email,required',
          list_email: [
            {
              email: 'email,required',
              status: 'unsigned',
            },
          ],
          worker: {
            position: 'word,maxLength:32',
            depart: 'word,maxLength:32',
            status: 'unsigned',
          },
          list_addresses: [
            {
              name: 'string,required,maxLength:48',
              reference: 'string,required,maxLength:128',
              street: 'string,required,maxLength:48',
              colony: 'string,required,maxLength:48',
              city: 'string,required,maxLength:48',
              state: 'string,required,maxLength:21',
              out_num: 'unsigned,required',
              int_num: 'unsigned',
              zip_code: 'string,required,length:5',
              country: 'string,required,maxLength:5',
              lada: 'string,required,maxLength:3',
              phone: 'string,required,maxLength:8',
              status: 'unsigned',
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
