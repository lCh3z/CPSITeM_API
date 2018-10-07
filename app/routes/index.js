const router = require('express').Router();
const middlewares = require('../middlewares')

const userRouter = require('./userR');
const orderRouter = require('./orderR');
const serviceRouter = require('./serviceR');
const productRouter = require('./productR');
const notificationRouter = require('./notificationR');
const newsListRouter = require('./newsListR');
const statServiceRouter = require('./statServiceR');
const imgStatServRouter = require('./imgStatServR');
const categoryRouter = require('./categoryR');
const cupponRouter = require('./cupponR');
const paymentRouter = require('./paymentR');
const configurationRouter = require('./configurationR');
const sectionRouter = require('./sectionR');
const confSectionRouter = require('./confSectionR');

router.get('/', (req, res) => { res.status(200).send('Hola mundo!'); });

router.use('/user', userRouter);
router.use('/order',orderRouter);
router.use('/service',serviceRouter);
router.use('/product',productRouter);
router.use('/notification',notificationRouter);
router.use('/newsList',newsListRouter);
router.use('/statService',statServiceRouter);
router.use('/imgStatServ',imgStatServRouter);
router.use('/category',categoryRouter);
router.use('/cuppon',cupponRouter);
router.use('/payment',paymentRouter);
router.use('/configuration',configurationRouter);
router.use('/section',sectionRouter);
router.use('/confSection',confSectionRouter);


module.exports = router;
