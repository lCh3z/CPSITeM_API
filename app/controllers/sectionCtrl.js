const db = require('../db');
const { SectionMdl, Responses } = require('../models');

/**
 *
 * @classdesc Class of controller Section, contain the getAll, get, create, update and delete
 *            alike a functions, all are initialize with the information
 *            of his ".bind", also has a function to get the Configuration ot the Section
 * @version   15/10/2018
 */
class sectionCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @async
   * Async function to get all the data from the model of SectionMdl, depending
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

      let data = await SectionMdl.select(
        '_Section_',
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

      if (data.length === 0) {
        res.status(500).send(Responses.notFound('Section'));
      } else {
        const total = await SectionMdl.count(
          '_Section_',
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
   * Async function to get a specific Section used model of category with a select to the
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
      let data = await SectionMdl.select(
        '_Section_',
        [
          '*',
        ],
        [
          {
            attr: 'id',
            oper: '=',
            val: Number(req.param('id')),
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
        null,
        null,
      );

      [data] = data;

      if (!data) {
        res.status(500).send(Responses.notFound('Section'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to create a new Section, the controller response depending if
   * a promise of Section.save() responses sending a especific response of created a
   * Section, can catch a error and calls the next whit the error
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
      const Section = new SectionMdl(req.body)
      let result = await Section.save(req.body.conf_section);
      if (result) {
        return res.status(201).send(Responses.created('Section'));
      } else {
        return res.status(500).send(Responses.cantCreate('Section'));
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to update data from the model of category, the controller update
   * the data from CategoryMdl with the request information, depending a result of save
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
      const Section = new SectionMdl(req.body);
      Section.id =  Number(req.param('id'));
      const result = await Section.update(req.body.conf_section);

      if(!result){
        res.status(500).send(Responses.cantRegister('Section'));
      }
      res.status(201).send(Responses.updated('Section'));
  } catch (e) {
    next(e);
  }
}

/**
 * @async
 * Async function to delete data from the model of Section, the controller delete data from
 * the model of Section with the request information, next to it indicates to Section the delete that data,
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
      const Section = new SectionMdl({
        id: Number(req.param('id')),
      });

      const result = await Section.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Section'));
      }
      res.status(201).send(Responses.deleted('Section'));
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to get a specific Configuration of this Section, find in the database
   * the Configuration with id of Section
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async getConfSection() {
    const result = await db.select(
      '_ConfSection_',
      [
        'id_section',
      ],
      [
        {
          attr: 'id_section',
          oper: '=',
          val: this.id_section,
        },
        {
          logic: 'and',
          attr: 'status',
          oper: '!=',
          val: 0,
        },
      ],
      null,
      null,
    );

  }
}

module.exports = new sectionCtrl();
