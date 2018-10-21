const { NewsListMdl } = require('../models');

/**
 *
 * @classdesc Class of controller Category, contain the getAll, create, update and
 *            processResult alike a functions, all are initialize with the information
 *            of his ".bind"
 * @version   15/10/2018
 */
class newsListCtrl{
  constructor(){
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getAll = this.getAll.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  /**
   * Function than recibes a param, used a array to save a Model of newsListMdl,
   * iterate on a forEach of the first param to push the model
   * @param  {Await Object}     data  Required the data from newListMdl.select to get
   *                                  all the data from database.
   * @return {Array}                  Return a array with iterate with the models of
   *                                  newsListMdl
   * @version 15/10/2018
   */
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new NewsListMdl(res));
    });
    return result;
  }

  /**
   * @async
   * Async function to get all the data from the model of newsListMdl (DB), depending
   * the recived response with a error of notFound or send the got data, catch a error
   * and calls the next with the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise}                  Promise to return the data results
   * @version 15/10/2018
   */
  async getAll(req, res){
    let data = await db.getAll('_NewsList_', ['email', 'status'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  /**
   * @async
   * Async function to create a new newsList, the controller response depending if
   * a promise of newsList.save() responses sending a especific response of created a
   * category, can catch a error and calls the next whit the error
   * @param  {Request Object}     req   Request to the function, includes information in params
   * @param  {Response Object}    res   Response than will give the function
   * @param  {Next Object}        next  In case of be necessary go by a other the work or
   *                                    if spawn a error
   * @return {Promise, Response}        Promise return a response of created or can´t be created
   *
   * @version 15/10/2018
   */
  async create(req, res){
    const newList = new NewsListMdl(req.body);

    const result = await newList.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }

  /**
   * @async
   * Async function to update data from the model of newList, the controller update
   * the data from newListMdl with the request information, depending a result of save
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
    const newList = new NewsListMdl(req.body);
    newList.id = req.param('id');

    const result = await newList.save();

    // FIXME Evitar codigos numericos que no son claros
    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }
}

module.exports = new newsListCtrl();
