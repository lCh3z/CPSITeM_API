const router = require('express').Router();
const { userCtrl } = require('../controllers');
const middleware = require('../middlewares');

router.post('/register', (req, res)=>{
  res.send('register');
});

// router.post('/login', );
// router.get('/logout', );

module.exports = router;
