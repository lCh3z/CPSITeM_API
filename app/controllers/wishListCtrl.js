const { WishListMdl, Responses } = require('../models');

/**
 *
 * @classdesc Class of controller WishList, contain the getAll, create, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class wishListCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  /**
   * Function than recibes two params, used a array to save a Model of WishListMdl,
   * iterate on a forEach of the first param to push the model, can catch a error
   * and calls the next with error
   * @param  {Await Object}     data  Required the data from CategoryMdl.select to get
   *                                  all the data from database.
   * @param  {Next Object}      next  For launch the work to others, unused
   * @return {Array}                  Return a array with iterate with the models of
   *                                  CategoryMdl and the promise
   * @version 15/10/2018
   */
  processResult(data, next) {
    try{
      const result = [];
      data.forEach((res) => {
        result.push(new WishListMdl(res));
      });
      return result;
    }
    catch (e){
      next(e);
    }
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
    try {
      let data = await WishListMdl.select(
        '_WishList_',
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
        res.status(409).send(Responses.notFound('wishlist'));
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      next(e);
    }
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
  async create(req, res, next) {
    try {
      let WishList = new WishListMdl(req.body);
      WishList.id_user = Number(req.param('id'))
      let result = await WishList.save();
      if (result) {
        res.status(201).send(Responses.created('wishlist'));
      } else {
        return res.status(500).send(Responses.cantCreate('wishlist'));
      }
    } catch (e) {
      next(e);
    }
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
    try {
      const WishList = new WishListMdl({
        id_user: Number(req.param('id')),
        id_product: Number(req.param('id_product')),
      });

      const result = await WishList.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('wishlist'));
      } else {
        res.status(200).send(Responses.deleted('wishlist'));
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new wishListCtrl();
