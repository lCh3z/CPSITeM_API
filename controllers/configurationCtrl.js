const Factory = require('../factory');

class configurationCtrl {
  constructor() {
    this.data = [{
      id : 1,
      label: 'label',
      value: 'value1',
    },
    {
      id : 2,
      label: 'label',
      value: 'value2',
    }];
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  getAll(req, res) {
    const json = {
      response : 'OK',
      data : this.data
    };
    res.send(json);
  }
  create(req, res) {
    const lastId = this.data[this.data.length -1].id;
    const data = {
      id : lastId +1,
      label: req.param('label'),
      value: req.param('value'),
    };
    this.data.push(data);
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
  update(req, res) {
    let self = this;
    let id = Number(req.params.id);
    let data = this.data.find(el => el.id === id);
    data = {
      id : Number(req.param('id')),
      label: req.param('label') === undefined ? self.data[id-1].label : req.param('label'),
      value: req.param('value') === undefined ? self.data[id-1].value : req.param('value'),
    }
  }
  delete(req, res) {
    const data = this.data.find(el => el.id === Number(req.params.id));
    this.data.splice(this.data.indexOf(data), 1);
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
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
