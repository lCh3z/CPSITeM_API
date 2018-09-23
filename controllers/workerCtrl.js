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
    let json;
    if (data.length === 0) {
      json = {
        response: 'OK',
        data: [{ message: 'No existen elementos que cumplan con lo solicitado' }],
      };
      res.status(400).send(json);
    } else {
      json = {
        data,
      };
      res.status(200).send(json);
    }
  }
  async get(req, res){
    let data = await db.getAll('_Worker_',['id_user','position','depart'],[{ attr: 'id_user', oper: '=', val: Number(req.param('id_user')) }]);
    data = this.processResult(data);
    let json;
    if (data.length === 0) {
      json = {
        response: 'OK',
        error: 'No se encontró el elemento solicitado',
      };
      res.status(4004).send(json);
    } else {
      json = {
        response: 'OK',
        data,
      };
      res.status(200).send(json);
    }
  }
  async create(req, res){
    const newWorker = new WorkerMdl(req.body);

    const result = await newWorker.save();

    const json = {
      response: 'OK',
    };

    if(result == 0){
      json.message = 'Registrado correctamente';
      res.status(201).send(json);
    } else if (result === 1) {
      json.error = 'No se pudo registrar';
      res.status(400).send(json);
    }
  }
  async update(req, res){
    const Worker = new WorkerMdl(req.body);
    Worker.id_user = req.param('id_user');

    const result = await Worker.save();

    const json = {
      response: 'OK',
    };

    if(result == 0){
      json.message = 'Actualizado correctamente';
      res.status(200).send(json);
    } else if (result === 1) {
      json.message = 'Registrado correctamente';
      res.status(201).send(json);
    } else if (result === 2) {
      json.error = 'No existe el elemento a actualizar';
      res.status(404).send(json);
    }
  }
  async delete(req, res){
    const Worker = new WorkerMdl({
      id_user: Number(req.param('id_user')),
    });

    const result = await Worker.delete();

    const json = {
      response: 'OK',
    };

    if(result == 0){
      json.message = 'Eliminado correctamente';
      res.status(200).send(json);
    } else if (result === 1) {
      json.error = 'No se pudo eliminar';
      res.status(400).send(json);
    } else if (result === 2) {
      json.error = 'No existe el elemento a eliminar';
      res.status(404).send(json);
    }
  }
}

module.exports = new workerCtrl();
