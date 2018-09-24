const db = require('../db');
const { WorkerMdl } = require('../models');

class workerCtrl{
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
      result.push(new WorkerMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_Worker_', ['id_user', 'position', 'depart'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res){
    let data = await db.get('_Worker_', ['id_user', 'position', 'depart'], [{ attr: 'id_user', oper: '=', val: Number(req.param('id_user')) }]);
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(404).send({ error: 'No se encontró el elemento solicitado' });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newWorker = new WorkerMdl(req.body);

    const result = await newWorker.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const Worker = new WorkerMdl(req.body);
    Worker.id_user = req.param('id_user');

    const result = await Worker.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res){
    const Worker = new WorkerMdl({
      id_user: Number(req.param('id_user')),
    });

    const result = await Worker.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new workerCtrl();
