const db = require('../db');
const { UserMdl } = require('../models');


class UserCtrl {
  constructor() {
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
      result.push(new UserMdl(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await db.getAll('_User_', ['id', 'photo', 'name', 'sec_name', 'pat_surname', 'mat_surname', 'company', 'rfc', 'cfdi', 'country', 'lada', 'phone', 'status', 'main_email'], '', '', '');
    // this.data = await db.getAll('_User_', ['name', 'sec_name'],
    // [{ attr: 'id', oper: '<', val: 5 },
    // { logic: 'and', attr: 'name', oper: '=', val: 'Mario' }],
    // { by: 'name', asc: false }, { start: 0, quant: 2 }); //Example with filters, order and limit
    data = this.processResult(data);

    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res) {
    let data = await db.get('_User_', ['id', 'photo', 'name', 'sec_name', 'pat_surname', 'mat_surname', 'company', 'rfc', 'cfdi', 'country', 'lada', 'phone', 'status', 'main_email'], [{ attr: 'id', oper: '=', val: Number(req.param('id')) }]);
    data = this.processResult(data);

    if (data.length === 0) {
      res.status(404).send({ error: 'No se encontró el elemento solicitado' });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res) {
    const newUser = new UserMdl({...req.body});

    const result = await newUser.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }

  async update(req, res) {
    const User = new UserMdl(req.body);
    User.id = req.param('id');

    const result = await User.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res) {
    const User = new UserMdl({
      id: Number(req.param('id')),
    });

    const result = await User.delete();


    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new UserCtrl();
