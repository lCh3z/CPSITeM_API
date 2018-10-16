const Factory = require('../factory');
const { OrderMdl, ConfigurationMdl  } = require('../models');

/**
 *
 * @classdesc Class of controller Configuration, contain the getAll, populate, create, update, delete and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind", except populate and processResult
 * @version   15/10/2018
 */
class configurationCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Function than recibes two params, used a array to save a Model of ConfigurationMdl,
   * iterate on a forEach of the first param to push the model
   * @param  {Await Object}     data  Required the data from ConfigurationMdl.select to get
   *                                  all the data from database.
   * @return {Array}                  Return a array with iterate with the models of
   *                                  ConfigurationMdl
   * @version 15/10/2018
   */
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ConfigurationMdl(res));
    });
    return result;
  }

  /**
   * @async
   * Async function to get all the data from the model of ConfigurationMdl (DB), depending
   * the recived response with a error of notFound or send the got data
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async getAll(req, res){
    let data = await db.getAll('_Configuration_', ['label', 'value'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  /**
   * @async
   * Async function to create a new Configuration, the controller response depending if
   * a promise of category.save() responses sending a especific response of created a
   * category
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of created or can´t be created
   *
   * @version 15/10/2018
   */
  async create(req, res){
    const newConfiguration = new ConfigurationMdl(req.body);

    const result = await newConfiguration.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }

  /**
   * @async
   * Async function to update data from the model of configuration, the controller update
   * the data from ConfigurationMdl with the request information, depending a result of save
   * data it indicates if the data was updated of not
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of updated or can´t be registered
   *
   * @version 15/10/2018
   */
  async update(req, res){
    const Configuration = new ConfigurationMdl(req.body);
    Configuration.id_user = req.param('label');

    const result = await Configuration.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  /**
   * @async
   * Async function to delete data from the model of configuration, the controller delete data from
   * the model of configuration with the request information, next to it indicates to category the delete that data,
   * depending the result if can be deleted response if data was or not deleted
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of can´t be deleted or deleted
   *
   * @version 15/10/2018
   */
  async delete(req, res){
    const Cart = new CartMdl({
      id_user: Number(req.param('id_user')),
    });

    const result = await Cart.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }

  /**
   * @async
   * Async function to generate new data in others tables
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @return {Promise, Response}        Promise return a response of can´t be deleted or deleted
   *
   * @version 15/10/2018
   */
  async populate(req, res) {
    if (Number(req.param('num')) > 0) {
      let result = 1;
      if (req.param('table') === '_User_') { result = await Factory.createUser(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Order_') { result = await Factory.createOrder(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Service_') { result = await Factory.createService(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Product_') { result = await Factory.createProduct(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Notification_') { result = await Factory.createNotification(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_StatService_') { result = await Factory.createStatService(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_ImgStatService_') { result = await Factory.createImgStatService(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Category_') { result = await Factory.createCategory(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_ImgProduct_') { result = await Factory.createImgProduct(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Address_') { result = await Factory.createAddress(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Payment_') { result = await Factory.createPayment(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_Section_') { result = await Factory.createSection(req.body, Number(req.param('num'))); }
      else if (req.param('table') === '_ConfSection_') { result = await Factory.createConfSection(req.body, Number(req.param('num'))); }

      if(result === 0) {
        res.status(201).send({message: `${req.param('num')} elementos agregados correctamente.`});
      } else {
        res.status(400).send({error: 'No se pudo realizar la operación'});
      }
    }
    res.status(404).send({error: 'Debes especificar una cantidad'});
  }
}

module.exports = new configurationCtrl();
