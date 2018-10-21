const router = require('express').Router();
const middleware = require('../middlewares');

router.post('/register', (req, res, next) => {
  middleware.auth.register(req, res, next);
  console.log('OK');
});

// router.post('/login', );
// router.get('/logout', );

module.exports = router;
