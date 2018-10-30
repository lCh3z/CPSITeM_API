const router = require('express').Router();
const middlewares = require('../middlewares');
const { userCtrl } = require('../controllers');

router.post('/register', (req, res, next) => {
  middlewares.auth.register(req, res, next);
}, (req, res) => {
  if (req.body.message.token) {
    res.header('Authorization', `Bearer ${req.body.message.token}`);
  }
  res.status(200).send({ message: req.body.message });
});

router.post('/login', (req, res, next) => {
  middlewares.auth.login(req, res, next);
}, (req, res) => {
  if (req.body.message.token) {
    res.header('Authorization', `Bearer ${req.body.message.token}`);
  }
  res.status(200).send({ message: req.body.message });
});

router.get('/logout',
  [
    middlewares.auth.isLogged,
  ],
  (req, res, next) => {
    middlewares.auth.logout(req, res, next);
  }, (req, res) => {
    res.status(200).send({ message: req.body.message });
  });

// router.get('/logout', );

module.exports = router;
