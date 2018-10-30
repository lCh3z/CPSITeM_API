const router = require('express').Router();
const middlewares = require('../middlewares')

const mailer = require('../mail');
const userRouter = require('./userR');
const orderRouter = require('./orderR');
const serviceRouter = require('./serviceR');
const productRouter = require('./productR');
const notificationRouter = require('./notificationR');
const newsListRouter = require('./newsListR');
const categoryRouter = require('./categoryR');
const cupponRouter = require('./cupponR');
const paymentRouter = require('./paymentR');
const configurationRouter = require('./configurationR');
const sectionRouter = require('./sectionR');
const authRouter = require('./authR');

router.get('/', (req, res) => { res.status(200).send('Hola mundo!'); });

router.get('/email', (req, res) => {
  let mailOptions = {
    to: 'ulisesmrb@gmail.com',
    subject: 'Hello email ✔',
    text: 'Hello CPSITeM',
    html: '<b>Hello world?</b>'
};
  mailer.sendMail(mailOptions);
  res.status(200).send('CPSITeM API');
});
router.use('/user', userRouter);
router.use('/order',orderRouter);
router.use('/service',serviceRouter);
router.use('/product',productRouter);
router.use('/notification',notificationRouter);
router.use('/newsList',newsListRouter);
router.use('/category',categoryRouter);
router.use('/cuppon',cupponRouter);
router.use('/payment',paymentRouter);
router.use('/configuration',configurationRouter);
router.use('/section',sectionRouter);
router.use('/', authRouter);


module.exports = router;
