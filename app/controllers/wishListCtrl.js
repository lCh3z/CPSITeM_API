const { WishListMdl, Response } = require('../models');

/**
 *
 * @classdesc Class of controller WishList, contain the getAll, create, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class wishListCtrl{
  constructor(){
    this.table = 'wishlist';
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @async
   * Async function to get all the data from the model of WishListMdl, depending
   * the recived response with a error of notFound or send the got data, can catch a error
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
    try{
      let page = Number(req.param('page'));
      let per_page = Number(req.param('per_page'));
      if (!page) {
        page = 0;
      }
      if (!per_page) {
        per_page = 20;
      }

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

      const data = await WishListMdl.select(
        '_WishList_',
        [
          'id_user',
          'id_product',
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
        .setStatus(200)
        .notFound(this.table);
      } else{
        const total = await WishListMdl.count(
          '_WishList_',
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
   * Async function to create a new WishList, the controller response depending if
   * a promise of WishList.save() responses sending a especific response of created a
   * Wish List, can catch a error and calls the next whit the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise, Response}        Promise return a response of created or can´t be created
   *
   * @version 15/10/2018
   */
  async create(req, res, next){
    const response = new Response();
    try {
      const WishList = new WishListMdl(req.body);
      if (!await WishList.save()) {
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
   * Async function to delete data from the model of WishList, the controller delete data from
   * the model of WishList with the request information, next to it indicates to Wish List the delete that data,
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
      const WishList = new WishListMdl({
        id_user: Number(req.param('id_user')),
      });

      if (!await WishList.delete()) {
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

module.exports = new wishListCtrl();
