const db = require('../db');
const { CartMdl, Responses } = require('../models');

/**
 *
 * @classdesc Class of controller cart, contain the getAll, create, update, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class cartCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  /**
   * Function than recibes two params, used a array to save a Model of CartMdl,
   * iterate on a forEach of the first param to push the model.
   * @param  {Await Object}     data  Required the data from CartMdl.select to get
   *                                  all the data from database.
   * @param  {Next Object}      next  For launch the work to others, unused
   * @return {Array}                  Return a array with iterate with the models of
   *                                  CartMdl
   * @version 15/10/2018
   */
  processResult(data, next) {
    const result = [];
    data.forEach((res) => {
      result.push(new CartMdl(res));
    });
    return result;
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
    try {
      let data = await CartMdl.select(
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

      data = this.processResult(data, next);

      if (data.length === 0) {
        res.status(409).send(Responses.notFound('cart'));
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      next(e);
    }
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
    try {
      let Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'))
      let result = await Cart.save();
      if (result) {
        res.status(201).send(Responses.created('cart'));
      } else {
        return res.status(500).send(Responses.cantCreate('cart'));
      }
    } catch (e) {
      next(e);
    }
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
    try {
      let Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'))
      Cart.id_product = Number(req.param('id_product'))
      const result = await Cart.save();
      if (result) {
        res.status(200).send(Responses.updated('cart'));
      } else {
        return res.status(500).send(Responses.cantUpdate('cart'));
      }
    } catch (e) {
      next(e);
    }
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
    try {
      const Cart = new CartMdl({
        id_user: Number(req.param('id')),
        id_product: Number(req.param('id_product')),
      });

      const result = await Cart.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('cart'));
      } else {
        res.status(200).send(Responses.deleted('cart'));
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new cartCtrl();
