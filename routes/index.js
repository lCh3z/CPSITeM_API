const router = require('express').Router();
const clientRouter = require('./clientR');
const userRouter = require('./userR');
const listEmailRouter = require('./listEmailR');
const wishlistRouter = require('./wishlistR');
const cartRouter = require('./cartR');
const orderRouter = require('./orderR');
const listProdRouter = require('./listProdR');
const serviceRouter = require('./serviceR');
const productRouter = require('./productR');
const notificationRouter = require('./notificationR');
const newslistRouter = require('./newslistR');
const statServiceRouter = require('./statServiceR');
const imgStatServiceRouter = require('./imgStatServiceR');
const categoryRouter = require('./categoryR');
const imgProductRouter = require('./imgProductR');
const cupponRouter = require('./cupponR');
const addressRouter = require('./addressR');
const paymentRouter = require('./paymentR');
const configurationRouter = require('./configurationR');
const sectionRouter = require('./sectionR');
const confSectionRouter = require('./confSectionR');

 router.get('/', (req, res) => res.send('ExpressJS 101 API'));

router.use('/client', clientRouter);
router.use('/user',userRouter);
router.use('/listEmail',listEmailRouter);
router.use('/wishlist',wishlistRouter);
router.use('/cart',cartRouter);
router.use('/order',orderRouter);
// router.use('/listProd',listProdRouter);
// router.use('/service',serviceRouter);
// router.use('/product',productRouter);
// router.use('/notification',notificationRouter);
// router.use('/newsList',newsListRouter);
// router.use('/statService',statServiceRouter);
// router.use('/imgStatService',imgStatServiceRouter);
// router.use('/category',categoryRouter);
// router.use('/imgProduct',imgProductRouter);
// router.use('/cuppon',cupponRouter);
// router.use('/address',addressRouter);
// router.use('/payment',paymentRouter);
// router.use('/configuration',configurationRouter);
// router.use('/section',sectionRouter);
// router.use('/confSection',confSectionRouter);


module.exports = router;
