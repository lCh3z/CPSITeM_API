const Factory = require('../factory');
const { ConfigurationMdl, Response } = require('../models');

/**
 *
 * @classdesc Class of controller Configuration, contain the getAll, populate, create, update, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind", except populate and processResult
 * @version   15/10/2018
 */
class configurationCtrl {
  constructor() {
    this.table = 'configuration';
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @async
   * Async function to get all the data from the model of ConfigurationMdl (DB), depending
   * the recived response with a error of notFound or send the got data
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async get(req, res, next) {
    const response = new Response();
    try {
      let data = await ConfigurationMdl.select(
        '_Configuration_',
        [
          '*',
        ],
        [
          {
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
      );
      if (!data.length) {
        response.bad()
          .setStatus(200)
          .notFound(this.table);
      } else {
        [data] = data;
        response.ok()
          .setStatus(200)
          .setData(data);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  /**
   * @async
   * Async function to create a new Configuration, the controller response depending if
   * a promise of category.save() responses sending a especific response of created a
   * category
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of created or can´t be created
   *
   * @version 15/10/2018
   */
  async create(req, res){
    const response = new Response();
    try {
      const Configuration = new ConfigurationMdl(req.body);

      if (!await Configuration.save()) {
        response.bad()
          .setStatus(409)
          .cantRegister(this.table);
      } else {
        response.ok()
          .setStatus(201)
          .registered(this.table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  /**
   * @async
   * Async function to update data from the model of configuration, the controller update
   * the data from ConfigurationMdl with the request information, depending a result of save
   * data it indicates if the data was updated of not
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of updated or can´t be registered
   *
   * @version 15/10/2018
   */
  async update(req, res){
    const response = new Response();
    try {
      const Configuration = new ConfigurationMdl(req.body);
      Configuration.id = req.param('id');

      if (!await Configuration.save()) {
        response.bad()
          .setStatus(409)
          .cantUpdate(this.table);
      } else {
        response.ok()
          .setStatus(200)
          .updated(this.table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  /**
   * @async
   * Async function to delete data from the model of configuration, the controller delete data from
   * the model of configuration with the request information, next to it indicates to category the delete that data,
   * depending the result if can be deleted response if data was or not deleted
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of can´t be deleted or deleted
   *
   * @version 15/10/2018
   */
  async delete(req, res, next) {
    const response = new Response();
    try {
      const Configuration = new ConfigurationMdl({
        id: Number(req.param('id')),
      });

      if (!await Configuration.delete()) {
        response.bad()
          .setStatus(404)
          .cantDelete(this.table);
      } else {
        response.ok()
          .setStatus(200)
          .deleted(this.table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  /**
   * @async
   * Async function to generate new data in others tables
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of can´t be deleted or deleted
   *
   * @version 15/10/2018
   */
  async populate(req, res, next) {
    const response = new Response();
    try {
      let result = false;
      const table = req.body.table;
      const num = req.body.num;
      delete req.body.table;
      delete req.body.num;
      if (table === '_User_') { result = await Factory.createUser(Number(num)); }
      else if (table === '_Order_') { result = await Factory.createOrder(Number(num)); }
      else if (table === '_Service_') { result = await Factory.createService(Number(num)); }
      else if (table === '_Product_') { result = await Factory.createProduct(Number(num)); }
      else if (table === '_Notification_') { result = await Factory.createNotification(Number(num)); }
      else if (table === '_Category_') { result = await Factory.createCategory(Number(num)); }
      else if (table === '_Payment_') { result = await Factory.createPayment(Number(num)); }
      else if (table === '_Section_') { result = await Factory.createSection(Number(num)); }

      if (!result) {
        response.bad()
          .setStatus(409)
          .cantUpdate(this.table);
      } else {
        response.ok()
          .setStatus(200)
          .updated(table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }
}

module.exports = new configurationCtrl();
