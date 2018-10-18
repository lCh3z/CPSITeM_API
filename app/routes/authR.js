const router = require('express').Router();
const middleware = require('../middlewares');
const { userCtrl } = require('../controllers');

router.post('/register', (req, res, next) => {
  middleware.auth.register(req, res, next);
}, (req, res) => { res.send('Cuando esté bien implementado, se redireccionará al perfil'); });

// router.post('/login', );
// router.get('/logout', );

module.exports = router;
