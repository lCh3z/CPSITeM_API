const models = require('../models');

/**
 * This class creates objects of a class in a masive way and then
 * are storage in the data base
 */
class Factory {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  /**
   * @async
   * Async function that creates and saves certain number of users
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createUser(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.UserMdl(base).save();
    }
    return status;
  }
  /**
   * @async
   * Async function that creates and saves certain number of orders
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createOrder(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.OrderMdl(base).save();
    }
    return status;
  }

  /**
   * @async
   * Async function that creates and saves certain number of services
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createService(num) {
    let status = true;
    for(let i = 0; i < num && status; i += 1) {
      status = await new models.ServiceMdl({
        id_seller: 1,
        id_user: 2,
        hospital: 'dummie',
      }).save([
        {
          title: 'Testing status post',
          description: null,
          materials: null,
          observations: null,
          imgs: [
            {
              photo: 'p1.jpg',
              status: 1,
            },
          ],
        }
      ]);
    }
    return status;
  }

  async createProduct(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ProductMdl(base).save();
    }
    return status;
  }
  /**
   * @async
   * Async function that creates and saves certain number of notifications
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createNotification(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.NotificationMdl(base).save();
    }
    return status;
  }
  /**
   * @async
   * Async function that creates and saves certain number of categories
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createCategory(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.CategoryMdl(base).save();
    }
    return status;
  }

  /**
   * @async
   * Async function that creates and saves certain number of payments
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createPayment(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.PaymentMdl(base).save();
    }
    return status;
  }
  /**
   * @async
   * Async function that creates and saves certain number of sections
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createSection(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.SectionMdl(base).save();
    }
    return status;
  }
  /**
   * @async
   * Async function that creates and saves certain number of configuration sections
   * @param  {Object}  base  Data that wants to be stored
   * @param  {Integer}  num  Number of objects that want to be created
   * @return {Promise}       Returns a promise with the status if all the objects
   *                         could be created or not
   * @version 15/10/18
   */
  async createConfSection(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ConfSectionMdl(base).save();
    }
    return status;
  }
}

module.exports = new Factory();
