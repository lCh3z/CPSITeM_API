const db = require('../db');
const { AddressMdl } = require('../models');

class addressCtrl{
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
      result.push(new AddressMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_Address_', ['id', 'id_user', 'name', 'street', 'colony', 'city', 'state', 'date', 'out_num','int_num', 'zip_code', 'phone', 'email'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res){
    let data = await db.get('_Address_', ['id', 'id_user', 'name', 'street', 'colony', 'city', 'state', 'date', 'out_num','int_num', 'zip_code', 'phone', 'email'], [{ attr: 'id', oper: '=', val: Number(req.param('id')) }]);
    if (data.length === 0) {
      res.status(404).send({ error: 'No se encontró el elemento solicitado' });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newaddress = new AddressMdl(req.body);

    const result = await newaddress.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const Address = new AddressMdl(req.body);
    Address.id = req.param('id');

    const result = await Address.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res){
    const Address = new AddressMdl({
      id: Number(req.param('id')),
    });

    const result = await Address.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new addressCtrl();
