const router = require('express').Router();
const middleware = require('../middlewares');
const { userCtrl } = require('../controllers');

router.post('/register', (req, res, next) => {
  middleware.auth.register(req, res, next);
}, (req, res) => {
  res.header('Authorization', `Bearer ${req.body.message.token}`);
  res.status(200).send({ message: req.body.message });
  console.log('RES', res);
});

// router.post('/login', );
// router.get('/logout', );

module.exports = router;
