const { UserMdl, Responses } = require('../models');

/**
 *
 * @classdesc Class of controller User, contain the getAll, get, create, update and delete
 *            alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @async
   * Async function to get all the data from the model of UserMdl, depending
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

      let data = await UserMdl.select(
        '_User_',
        [
          'id',
          'photo',
          'name',
          'sec_name',
          'pat_surname',
          'mat_surname',
          'company',
          'type',
          'rfc',
          'cfdi',
          'country',
          'lada',
          'phone',
          'status',
          'main_email',
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

      if (data.length === 0) {
        res.status(409).send(Responses.notFound('user'));
      } else {
        const total = await UserMdl.count(
          '_User_',
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
   * Async function to get a specific User used model of User with a select to the
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
      let data = await UserMdl.select(
        '_User_',
        [
          'id',
          'photo',
          'name',
          'sec_name',
          'pat_surname',
          'mat_surname',
          'company',
          'type',
          'rfc',
          'cfdi',
          'country',
          'lada',
          'phone',
          'status',
          'main_email',
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

      if (!data) {
        res.status(404).send(Responses.notFound('user'));
      } else {
        [data] = data;
        res.status(200).send({ data });
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to create a new User, the controller response depending if
   * a promise of User.save() responses sending a especific response of created a
   * User, can catch a error and calls the next whit the error
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
      const User = new UserMdl(req.body);
      let result = await User.save();
      if (result) {
        res.status(201).send(Responses.created('user'));
      } else {
        return res.status(500).send(Responses.cantCreate('user'));
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to update data from the model of User, the controller update
   * the data from UserMdl with the request information, depending a result of save
   * data it indicates if the data was updated or not, can catch a error and calls
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
    try {
      const User = new UserMdl(req.body);
      User.id = Number(req.param('id'));

      const result = await User.update(req.body.list_email, req.body.worker, req.body.list_addresses);

      if(!result){
        res.status(500).send(Responses.cantCreate('user'));
      } else {
        res.status(200).send(Responses.updated('user'));
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to delete data from the model of User, the controller delete data from
   * the model of User with the request information, next to it indicates to User the delete that data,
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
      const User = new UserMdl({
        id: Number(req.param('id')),
      });

      const result = await User.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('user'));
      } else {
        res.status(200).send(Responses.deleted('user'));
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserCtrl();
