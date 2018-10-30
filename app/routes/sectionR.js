const router = require('express').Router();
const { sectionCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', sectionCtrl.getAll);

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
  sectionCtrl.get);

/**
 *
 * Route to obtain all the section depending on
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
          type: 'unsigned',
          status: 'unsigned',
          conf_section:[
            {
              title: 'string,required',
              subtitle: 'string',
              description: 'string',
            }
          ],
        },
      });
    },
  ], sectionCtrl.create);

  /**
   *
   * Route to put all the section according to.
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
          type: 'unsigned',
          status: 'unsigned',
          conf_section:[
            {
              title: 'string,required',
              subtitle: 'string',
              description: 'string',
            }
          ],
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
  ], sectionCtrl.update);

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
  sectionCtrl.delete);
module.exports = router;
