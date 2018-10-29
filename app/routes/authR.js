const router = require('express').Router();
const middleware = require('../middlewares');
const { userCtrl } = require('../controllers');

router.post('/register', (req, res, next) => {
  middleware.auth.register(req, res, next);
}, (req, res) => {
  if (req.body.message.token) {
    res.header('Authorization', `Bearer ${req.body.message.token}`);
  }
  res.status(200).send({ message: req.body.message });
});

router.post('/login', (req, res, next) => {
  middleware.auth.login(req, res, next);
}, (req, res) => {
  if (req.body.message.token) {
    res.header('Authorization', `Bearer ${req.body.message.token}`);
  }
  res.status(200).send({ message: req.body.message });
});

router.get('/logout', (req, res, next) => {
  middleware.auth.logout(req, res, next);
}, (req, res) => {
  res.status(200).send({ message: req.body.message });
});



// router.get('/logout', );

module.exports = router;
