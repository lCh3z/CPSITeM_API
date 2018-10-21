const { CupponMdl, Responses } = require('../models');

/**
 *
 * @classdesc Class of controller Cuppon, contain the getAll, get, create, update, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class cupponCtrl{
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
   * Function than recibes two params, used a array to save a Model of CupponMdl,
   * iterate on a forEach of the first param to push the model, can catch a error
   * and calls the next with error
   * @param  {Await Object}     data  Required the data from CategoryMdl.select to get
   *                                  all the data from database.
   * @param  {Next Object}      next  For launch the work to others
   * @return {Array}                  Return a array with iterate with the models of
   *                                  CupponMdl and the promise
   * @version 15/10/2018
   */
  async processResult(data, next) {
    try {
      let temp;
      let result = [];
      for (const res of data) {
        temp = new CupponMdl(res);
        result.push(temp);
      }
      return result;
    } catch (e) {
      next(e);
    }
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
    try {
      // FIXME Toda la logica para definir los parametros para filtros, paginado y ordenado se puede meter en un middleware
      const page = parseInt(req.param('page'));
      const per_page = parseInt(req.param('per_page'));
      const start = page * per_page;

      let data = await CupponMdl.select(
        '_Cuppon_',
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
        res.status(500).send(Responses.notFound('Cuppon'));
      } else {
        const total = await CupponMdl.count(
          '_Cuppon_',
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
    try {
      let data = await CupponMdl.select(
        '_Cuppon_',
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
        res.status(500).send(Responses.notFound('Cuppon'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
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
    try {
      let result = await new CupponMdl(req.body).save();
      if (result) {
        res.status(201).send(Responses.created('Cuppon'));
      } else {
        return res.status(500).send(Responses.cantCreate('Cuppon'));
      }
    } catch (e) {
      next(e);
    }
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
  async update(req, res, next){
    try {
      const Cuppon = new CupponMdl(req.body);
      Cuppon.id = Number(req.param('id'));

      const result = await Cuppon.update();

      if(!result){
        res.status(500).send(Responses.cantRegister('Cuppon'));
      }
      res.status(201).send(Responses.updated('Cuppon'));
  } catch (e) {
    next(e);
  }
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
    try {
      const Cuppon = new CupponMdl({
        id: Number(req.param('id')),
      });

      const result = await Cuppon.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Cuppon'));
      }
      res.status(201).send(Responses.deleted('Cuppon'));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new cupponCtrl();
