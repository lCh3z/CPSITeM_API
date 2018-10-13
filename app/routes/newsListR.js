const router = require('express').Router();
const { newsListCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', newsListCtrl.getAll);

router.post('/',
  [
    (req, res, next) =>{
      middlewares.validator.validate(req, res, next,{
        body:{
          email: 'email, required',
        },
      });
    },
  ], newsListCtrl.create);

router.put('/:email', newsListCtrl.update);

module.exports = router;
