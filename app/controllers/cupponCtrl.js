const { CupponMdl, Response } = require('../models');

/**
 *
 * @classdesc Class of controller Cuppon, contain the getAll, get, create, update, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class cupponCtrl {
  constructor() {
    this.table = 'cuppon';
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @async
   * Async function to get all the data from the model of CupponMdl (DB), depending
   * the recived response with a error of notFound or send the got data, catch a error
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
      // FIXME Toda la logica para definir los parametros para filtros, paginado y ordenado se puede meter en un middleware
      const page = Number(req.param('page'));
      const per_page = Number(req.param('per_page'));
      const start = page * per_page;

      let find = Number(req.param('find'));
      let f_col = Number(req.param('f_col'));
      let filters = null;
      if (find && f_col) {
        filters = [];
        filters.push(
          {
            attr: f_col,
            oper: 'LIKE',
            val: find,
          },
        );
      }

      let order = null;
      let ord = Number(req.param('order'));
      let ord_by = Number(req.param('ord_by'));
      let des = Number(req.param('desc'));
      if (ord && ord_by) {
        order = {};
        order.by =  ord_by;
        if (des) {
          order.desc = true;
        } else {
          order.desc = false;
        }
      }

      const data = await CupponMdl.select(
        '_Cuppon_',
        [
          'id',
          'code',
          'discount',
          'start',
          'end',
          'description',
          'status',
          'date',
          'updated',
        ],
        filters,
        order,
        {
          start,
          quant: per_page,
        },
      );

      if (!data.length) {
        response.bad()
          .setStatus(204)
          .notFound(this.table);
      } else {
        const total = await CupponMdl.count(
          '_Cuppon_',
          filters,
        );
        response.ok()
          .setStatus(200)
          .setData(data)
          .setPlus('per_page', per_page)
          .setPlus('page', page)
          .setPlus('total', total);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  /**
   * @async
   * Async function to get a specific category used model of cuppon with a select to the
   * database, depending the recived from the model response with a error or send the got
   * data, catch a error and calls the next with error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async get(req, res, next) {
    const response = new Response();
    try {
      let data = await CupponMdl.select(
        '_Cuppon_',
        [
          'id',
          'code',
          'discount',
          'start',
          'end',
          'description',
          'status',
          'date',
          'updated',
        ],
        [
          {
            attr: 'id',
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
   * Async function to create a new cuppon, the controller response depending if
   * a promise of Cuppon.save() responses sending a especific response of created a
   * category, can catch a error and calls the next whit the error
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
      const Cuppon = new CupponMdl(req.body);
      if (!await Cuppon.save()) {
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
   * Async function to update data from the model of cuppon, the controller update
   * the data from CupponMdl with the request information, depending a result of save
   * data it indicates if the data was updated of not, can catch a error and calls
   * the next with the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise, Response}        Promise return a response of updated or can´t be registered
   *
   * @version 15/10/2018
   */
  async update(req, res, next) {
    const response = new Response();
    try {
      const Cuppon = new CupponMdl(req.body);
      Cuppon.id = Number(req.param('id'));
      if (!await Cuppon.save()) {
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
   * Async function to delete data from the model of cuppon, the controller delete data from
   * the model of cuppon with the request information, next to it indicates to cuppon the delete that data,
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
      const Cuppon = new CupponMdl({
        id: Number(req.param('id')),
      });

      if (!await Cuppon.delete()) {
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

module.exports = new cupponCtrl();
