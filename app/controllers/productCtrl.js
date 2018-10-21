const { ProductMdl, Responses } = require('../models');

/**
 *
 * @classdesc Class of controller Product, contain the getAll, get, create, update and delete
 *            alike a functions, all are initialize with the information
 *            of his ".bind", also has a function to get the image of the product
 * @version   15/10/2018
 */
class productCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @async
   * Async function to get all the data from the model of ProductMdl, depending
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

      let data = await ProductMdl.select(
        '_Product_',
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
        res.status(500).send(Responses.notFound('product'));
      } else {
        const total = await ProductMdl.count(
          '_Product_',
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
   * Async function to get a specific Product used model of Product with a select to the
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
      let data = await ProductMdl.select(
        '_Product_',
        [
          'id',
          'id_cat',
          'name',
          'price',
          'status',
          'discount',
          'inventory',
          'description',
          'specs',
          'min_quan',
          'date',
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

      [data] = data;

      if (!data) {
        res.status(500).send(Responses.notFound('product'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to create a new Product, the controller response depending if
   * a promise of Productsave() responses sending a especific response of created a
   * Product, can catch a error and calls the next whit the error
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
      const Product = new ProductMdl(req.body)
      let result = await Product.save(req.body.list_imgs);
      if (result) {
        return res.status(201).send(Responses.created('product'));
      } else {
        return res.status(500).send(Responses.cantCreate('product'));
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to update data from the model of Product, the controller update
   * the data from ProductMdl with the request information, depending a result of save
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
  async update(req, res){
    try {
      const Product = new ProductMdl(req.body);
      Product.id = Number(req.param('id'));

      const result = await Product.update(req.body.list_imgs);

      if(!result){
        res.status(500).send(Responses.cantRegister('product'));
      }
      res.status(201).send(Responses.updated('product'));
  } catch (e) {
    next(e);
  }
}

/**
 * @async
 * Async function to delete data from the model of Product, the controller delete data from
 * the model of Product with the request information, next to it indicates to category the delete that data,
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
  async delete(req, res) {
    try {
      const Product = new ProductMdl({
        id: Number(req.param('id')),
      });

      const result = await Product.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Product'));
      }
      res.status(201).send(Responses.deleted('Product'));
    } catch (e) {
      next(e);
    }
  }

  /**
   * @async
   * Async function to get a specific Image of this product, find in the database
   * the image with id of product
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async getImgProduct() {
    const result = await db.select(
      '_ImgProduct_',
      [
        'id_prod',
      ],
      [
        {
          attr: 'id_prod',
          oper: '=',
          val: this.id_prod,
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

module.exports = new productCtrl();
