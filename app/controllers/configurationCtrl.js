const Factory = require('../factory');
const { ConfigurationMdl, Response } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado
// FIXME Los mensajes de respuestas deberian estar en ingles y  usar los responses que armaron

class configurationCtrl {
  constructor() {
    this.table = 'configuration';
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(req, res, next) {
    const response = new Response();
    try {
      let data = await ConfigurationMdl.select(
        '_Configuration_',
        [
          '*',
        ],
        [
          {
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
      );
      if (!data.length) {
        response.bad()
          .setStatus(204)
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

  async create(req, res, next) {
    const response = new Response();
    try {
      const Configuration = new ConfigurationMdl(req.body);

      if (!await Configuration.save()) {
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

  async update(req, res, next) {
    const response = new Response();
    try {
      const Configuration = new ConfigurationMdl(req.body);
      Configuration.id = req.param('id');

      if (!await Configuration.save()) {
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

  async delete(req, res, next) {
    const response = new Response();
    try {
      const Configuration = new ConfigurationMdl({
        id: Number(req.param('id')),
      });

      if (!await Configuration.delete()) {
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

  async populate(req, res, next) {
    const response = new Response();
    try {
      let result = false;
      const table = req.body.table;
      const num = req.body.num;
      delete req.body.table;
      delete req.body.num;
      if (table === '_User_') { result = await Factory.createUser(Number(num)); }
      else if (table === '_Order_') { result = await Factory.createOrder(Number(num)); }
      else if (table === '_Service_') { result = await Factory.createService(Number(num)); }
      else if (table === '_Product_') { result = await Factory.createProduct(Number(num)); }
      else if (table === '_Notification_') { result = await Factory.createNotification(Number(num)); }
      else if (table === '_StatService_') { result = await Factory.createStatService(Number(num)); }
      else if (table === '_ImgStatService_') { result = await Factory.createImgStatService(Number(num)); }
      else if (table === '_Category_') { result = await Factory.createCategory(Number(num)); }
      else if (table === '_ImgProduct_') { result = await Factory.createImgProduct(Number(num)); }
      else if (table === '_Address_') { result = await Factory.createAddress(Number(num)); }
      else if (table === '_Payment_') { result = await Factory.createPayment(Number(num)); }
      else if (table === '_Section_') { result = await Factory.createSection(Number(num)); }
      else if (table === '_ConfSection_') { result = await Factory.createConfSection(Number(num)); }

      if (!result) {
        response.bad()
          .setStatus(409)
          .cantUpdate(this.table);
      } else {
        response.ok()
          .setStatus(200)
          .updated(table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }
}

module.exports = new configurationCtrl();
