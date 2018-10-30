const router = require('express').Router();
const { notificationCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', notificationCtrl.getAll);

router.get('/:id',
[
  (req, res, next) =>{
    const request = middlewares.validator.code(req.params.id);
    if(request){
      next();
    }
    else{
      res.status(406).send(request);
    }
  },
],
 notificationCtrl.get);

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
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          title: 'string,required',
          cont: 'string,required',
          id_user: 'unsigned,required',
        },
      });
      const request = middlewares.validator.code(req.params.id);
      if(request){
        next();
      }
      else{
        res.status(406).send(request);
      }
    },
  ], notificationCtrl.update);

router.delete('/:id',
[
 (req, res, next) =>{
   const request = middlewares.validator.code(req.params.id);
   if(request){
     next();
   }
   else{
     res.status(406).send(request);
   }
 },
],
 notificationCtrl.delete);
module.exports = router;
