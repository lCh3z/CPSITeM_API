const Factory = require('../factory');
const { OrderMdl } = require('../models');
const { ConfigurationMdl } = require('../models');

class configurationCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ConfigurationMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_Configuration_', ['label', 'value'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }
  async create(req, res){
    const newConfiguration = new ConfigurationMdl(req.body);

    const result = await newConfiguration.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
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
