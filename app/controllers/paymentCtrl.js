const { PaymentMdl, Responses } = require('../models');

/**
 *
 * @classdesc Class of controller Payment, contain the getAll, get, create, update, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class paymentCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  /**
   * @async
   * Function than recibes two params, used a array to save a Model of PaymentMdl,
   * iterate on a for of the first param to push the model, can catch a error
   * and calls the next with error
   * @param  {Await Object}     data  Required the data from PaymentMdl.select to get
   *                                  all the data from database.
   * @param  {Next Object}      next  For launch the work to others
   * @return {Array}                  Return a array with iterate with the models of
   *                                  PaymentMdl and the promise
   * @version 15/10/2018
   */
  async processResult(data, next) {
    try {
      let temp;
      let result = [];
      for (const res of data) {
        temp = new PaymentMdl(res);
        result.push(temp);
      }
      return result;
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to get all the data from the model of PaymentMdl, depending
   * the recived response with a error of notFound or send the got data,can catch a error
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
      // FIXME Toda la logica para definir los parametros para filtros, paginado y ordenado se puede meter en un middleware
      let page = parseInt(req.param('page'));
      let per_page = parseInt(req.param('per_page'));
      if (!page) {
        page = 0;
      }
      if (!per_page) {
        per_page = 20;
      }
      const start = page * per_page;

      let find = parseInt(req.param('find'));
      let f_col = parseInt(req.param('f_col'));
      const filters = null;
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
      let ord = parseInt(req.param('order'));
      let ord_by = parseInt(req.param('ord_by'));
      let des = parseInt(req.param('desc'));
      if (ord && ord_by) {
        order = {};
        order.by =  ord_by;
        if (des) {
          order.desc = true;
        } else {
          order.desc = false;
        }
      }

      let data = await PaymentMdl.select(
        '_Payment_',
        [
          '*',
        ],
        filters,
        order,
        {
          start,
          quant: per_page,
        },
      );

      data = await this.processResult(data, next);

      if (data.length === 0) {
        res.status(500).send(Responses.notFound('Payment'));
      } else {
        const total = await PaymentMdl.count(
          '_Payment_',
          '',
          '',
        );

        res.status(200).send({
          data,
          per_page,
          page,
          total,
        });
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to get a specific Payment used model of Payment with a select to the
   * database, depending the recived from the model response with a error or send the got
   * data, can catch a error and calls the next with error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async get(req, res, next) {
    try {
      let data = await PaymentMdl.select(
        '_Payment_',
        [
          '*',
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

      [data] = await this.processResult(data, next);

      if (!data) {
        res.status(500).send(Responses.notFound('Payment'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to create a new Payment, the controller response depending if
   * a promise of Payment.save() responses sending a especific response of created a
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
    try {
      let result = await new PaymentMdl(req.body).save();
      if (result) {
        res.status(201).send(Responses.created('Payment'));

      } else {
        return res.status(500).send(Responses.cantCreate('Payment'));
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to update data from the model of Payment, the controller update
   * the data from PaymentMdl with the request information, depending a result of save
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
  async update(req, res, next){
    try {
      const Payment = new PaymentMdl(req.body);
      Payment.id = Number(req.param('id'));

      const result = await Payment.update();

      if(!result){
        res.status(500).send(Responses.cantRegister('Payment'));
      }
      res.status(201).send(Responses.updated('Payment'));
  } catch (e) {
    next(e);
  }
}

/**
 * @async
 * Async function to delete data from the model of Payment, the controller delete data from
 * the model of Payment with the request information, next to it indicates to Payment the delete that data,
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
      const Payment = new PaymentMdl({
        id: Number(req.param('id')),
      });

      const result = await Payment.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Payment'));
      }
      res.status(201).send(Responses.deleted('Payment'));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new paymentCtrl();
