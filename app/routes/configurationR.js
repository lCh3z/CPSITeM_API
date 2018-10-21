const router = require('express').Router();
const { configurationCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta validar los params y el cuerpo del request
router.get('/', configurationCtrl.get);

router.post('/',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          label: 'string,required',
          value: 'string',
        },
      });
    },
  ], configurationCtrl.create);

router.post('/populate',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          table: 'string,required',
          num: 'integer,required',
        },
      });
    },
  ], configurationCtrl.populate);

router.put('/:id',
  [
    (req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          label: 'string,required',
          value: 'string',
          status: 'unsigned',
        },
      });
    },
  ], configurationCtrl.update);

router.delete('/:id', configurationCtrl.delete);

module.exports = router;
