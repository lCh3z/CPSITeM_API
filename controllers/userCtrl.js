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

  async get(req, res) {
    let data = await db.get('_User_', ['id', 'photo', 'name', 'sec_name', 'pat_surname', 'mat_surname', 'company', 'rfc', 'cfdi', 'country', 'lada', 'phone', 'status', 'main_email'], [{ attr: 'id', oper: '=', val: Number(req.param('id')) }]);
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

  async create(req, res) {
    const newUser = new UserMdl({...req.body});

    const result = await newUser.save();

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

  async update(req, res) {
    const User = new UserMdl(req.body);
    User.id = req.param('id');

    const result = await User.save();

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

  async delete(req, res) {
    const User = new UserMdl({
      id: Number(req.param('id')),
    });

    const result = await User.delete();

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

module.exports = new UserCtrl();
