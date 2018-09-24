const db = require('../db');
const { ListEmailMdl } = require('../models');

class listEmailCtrl{
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
      result.push(new ListEmailMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_ListEmail_', ['id_user', 'email', 'status'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res){
    let data = await db.getAll('_ListEmail_',['id_user','email','status'],[{ attr: 'id_user', oper: '=', val: Number(req.param('id_user')) }]);
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(404).send({ error: 'No se encontró el elemento solicitado' });
    } else {
      res.status(200).send({ data });
    }
  }
  async create(req, res){
    const newListEmail = new ListEmailMdl(req.body);

    const result = await newListEmail.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const ListEmail = new ListEmailMdl(req.body);
    ListEmail.id_user = req.param('id_user');

    const result = await ListEmail.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }
  async delete(req, res){
    const ListEmail = new ListEmailMdl({
      id_user: Number(req.param('id_user')),
    });

    const result = await ListEmail.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new listEmailCtrl();
