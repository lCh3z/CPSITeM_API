const db = require('../db');
const { ServiceMdl } = require('../models');

class serviceCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ServiceMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_Service_', ['id', 'id_seller', 'id_user', 'hospital', 'status', 'date', 'type', 'equipment', 'model', 'serial_', 'location', 'contract', 'description', 'voucher'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res){
    let data = await db.get('_Service_', ['id', 'id_seller', 'id_user', 'hospital', 'status', 'date', 'type', 'equipment', 'model', 'serial_', 'location', 'contract', 'description', 'voucher'], [{ attr: 'id', oper: '=', val: Number(req.param('id')) }]);
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(404).send({ error: 'No se encontró el elemento solicitado' });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newService = new ServiceMdl(req.body);

    const result = await newService.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const Service = new ServiceMdl(req.body);
    Service.id = req.param('id');

    const result = await Service.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res){
    const Service = new ServiceMdl({
      id: Number(req.param('id')),
    });

    const result = await Service.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new serviceCtrl();
