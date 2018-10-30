const router = require('express').Router();
const { categoryCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', categoryCtrl.getAll);

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
 categoryCtrl.get);


  /**
   *
   * Route to obtain all the Categories depending on
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
          name: 'word,required',
          description: 'string,required',
          photo: 'image',
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
  ], categoryCtrl.create);

  /**
   *
   * Route to put all the categories according to.
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
          name: 'word,required',
          description: 'string,required',
          photo: 'image',
          status: 'unsigned',
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
  ], categoryCtrl.update);

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
 categoryCtrl.delete);

module.exports = router;
