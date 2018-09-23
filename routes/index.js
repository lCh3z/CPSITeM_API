const router = require('express').Router();
const middlewares = require('../middlewares')

const userRouter = require('./userR');
const workerRouter = require('./workerR');
const listEmailRouter = require('./listEmailR');
const wishListRouter = require('./wishListR');
const cartRouter = require('./cartR');
const orderRouter = require('./orderR');
const listProdRouter = require('./listProdR');
const serviceRouter = require('./serviceR');
const productRouter = require('./productR');
const notificationRouter = require('./notificationR');
const newsListRouter = require('./newsListR');
const statServiceRouter = require('./statServiceR');
const imgStatServRouter = require('./imgStatServiceR');
const categoryRouter = require('./categoryR');
const imgProductRouter = require('./imgProductR');
const cupponRouter = require('./cupponR');
const addressRouter = require('./addressR');
const paymentRouter = require('./paymentR');
const configurationRouter = require('./configurationR');
const sectionRouter = require('./sectionR');
const confSectionRouter = require('./confSectionR');

router.get('/', middlewares.addDate, (req, res) => { res.status(200).send('Hola mundo!'); });

router.use('/user', userRouter);
router.use('/worker',workerRouter);
router.use('/listEmail',listEmailRouter);
router.use('/wishlist',wishListRouter);
router.use('/cart',cartRouter);
router.use('/order',orderRouter);
router.use('/listProd',listProdRouter);
router.use('/service',serviceRouter);
router.use('/product',productRouter);
router.use('/notification',notificationRouter);
router.use('/newsList',newsListRouter);
router.use('/statService',statServiceRouter);
router.use('/imgStatServ',imgStatServRouter);
router.use('/category',categoryRouter);
router.use('/imgProduct',imgProductRouter);
router.use('/cuppon',cupponRouter);
router.use('/address',addressRouter);
router.use('/payment',paymentRouter);
router.use('/configuration',configurationRouter);
router.use('/section',sectionRouter);
router.use('/confSection',confSectionRouter);


module.exports = router;
