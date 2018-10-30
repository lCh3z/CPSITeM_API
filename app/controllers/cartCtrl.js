const { CartMdl, Response } = require('../models');

/**
 *
 * @classdesc Class of controller cart, contain the getAll, create, update, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class cartCtrl {
  constructor() {
    this.table = 'cart';
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  permits() {
    return {
      POST: 'ADMIN,SELLER,CLIENT',
      GET: 'ADMIN,SELLER,CLIENT',
      PUT: 'ADMIN,SELLER,CLIENT',
      DELETE: 'ADMIN,SELLER,CLIENT',
    };
  }

  /**
   * @async
   * Async function to get all the data from the model of CartMdl (DB), depending
   * the recived response with a error or notFound or send the got data, catch a error
   * and calls the next with the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async getAll(req, res, next) {
    const response = new Response();
    try {
      const data = await CartMdl.select(
        '_Cart_',
        [
          '*',
        ],
        [
          {
            attr: 'id_user',
            oper: '=',
            val: Number(req.param('id')),
          },
        ],
        null,
        null,
      );

      if (!data.length) {
        response.bad()
          .setStatus(404)
          .notFound(this.table);
      } else {
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
   * Async function to create a new cart, the controller response depending if
   * a promise of Cart.save() responses sending a especific response of created a cart,
   * can catch a error and calls the next whit the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise, Response}        Promise return a response of created or can´t be created
   *
   * @version 15/10/2018
   */
  async create(req, res, next) {
    const response = new Response();
    try {
      const Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'));
      if (!await Cart.save()) {
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
   * Async function to update data from the model of cart, the controller update
   * the data from CartMdl with the request information, depending a result of save
   * data it indicates if the data was updated of not, can catch a error and calls
   * the next with the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise, Response}        Promise return a response of updated or can´t be updated
   *
   * @version 15/10/2018
   */
  async update(req, res, next) {
    const response = new Response();
    try {
      const Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'));
      Cart.id_product = Number(req.param('id_product'));
      if (!await Cart.save()) {
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
   * Async function to delete data from the model of cart, the controller delete data from
   * the model of cart with the request information, next to it indicates to cart the delete that data,
   * depending the result if can be deleted response if data was or not deleted, can catch a error
   * and calls next with error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise, Response}        Promise return a response of can´t be deleted or deleted
   *
   * @version 15/10/2018
   */
  async delete(req, res, next) {
    const response = new Response();
    try {
      const Cart = new CartMdl({
        id_user: Number(req.param('id')),
        id_product: Number(req.param('id_product')),
      });
      if (!await Cart.delete()) {
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
}

module.exports = new cartCtrl();
