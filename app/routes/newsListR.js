const router = require('express').Router();
const { newsListCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', newsListCtrl.getAll);

/**
 *
 * Route to obtain all the newlist depending on
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
          email: 'email,required',
        },
      });
    },
  ], newsListCtrl.create);

router.put('/:email',
[
  (req, res, next) => {
    middlewares.validator.validate(req, res, next, {
      body: {
        email: 'email,required',
      },
    });
    const request = middlewares.validator.email(req.params.email);
    if(request){
      next();
    }
    else{
      res.status(406).send(request);
    }
  },
],
 newsListCtrl.update);

module.exports = router;
