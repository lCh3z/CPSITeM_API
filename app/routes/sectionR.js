const router = require('express').Router();
const { sectionCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', sectionCtrl.getAll);

router.get('/:id', sectionCtrl.get);

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
    },
  ], sectionCtrl.update);

router.delete('/:id', sectionCtrl.delete);
module.exports = router;
