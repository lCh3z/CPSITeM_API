const router = require('express').Router();
const { categoryCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request

router.get('/', categoryCtrl.getAll);

router.get('/:id', categoryCtrl.get);

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
    },
  ], categoryCtrl.create);

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
    },
  ], categoryCtrl.update);

router.delete('/:id', categoryCtrl.delete);
module.exports = router;
