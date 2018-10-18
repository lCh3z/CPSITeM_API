const router = require('express').Router();
const middleware = require('../middlewares');
const { userCtrl } = require('../controllers');

router.post('/register', (req, res, next) => {
  middleware.auth.register(req, res, next);
}, (req, res, next) => { console.log(req.body); console.log(res); res.status(200).send({ message: req.body.message }); });

// router.post('/login', );
// router.get('/logout', );

module.exports = router;
