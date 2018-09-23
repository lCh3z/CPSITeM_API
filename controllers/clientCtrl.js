const db = require('../db');
const { ClientMdl } = require('../models');


class clientCtrl {
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
      result.push(new ClientMdl(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await db.getAll('_Client_', ['*'], '', '', '');
    // this.data = await db.getAll('_Client_', ['name', 'sec_name'],
    // [{ attr: 'id', oper: '<', val: 5 },
    // { logic: 'and', attr: 'name', oper: '=', val: 'Mario' }],
    // { by: 'name', asc: false }, { start: 0, quant: 2 }); //Example with filters, order and limit
    data = this.processResult(data);
    let json;
    if (data.length === 0) {
      json = {
        response: 'OK',
        data: [{ message: 'No se encontraron clientes' }],
      };
    } else {
      json = {
        response: 'OK',
        data,
      };
    }

    res.status(201).send(json);
  }

  async get(req, res) {
    let data = await db.get('_Client_', ['*'], [{ attr: 'id', oper: '=', val: Number(req.param('id')) }]);
    data = this.processResult(data);
    let json;
    if (data.length === 0) {
      json = {
        response: 'OK',
        data: [{ message: 'No se encontró el cliente' }],
      };
    } else {
      json = {
        response: 'OK',
        data,
      };
    }

    res.status(201).send(json);
  }

  async create(req, res) {
    const newClient = new ClientMdl({
      name: req.body.name,
      photo: req.body.photo,
      sec_name: req.body.sec_name,
      pat_surname: req.body.mat_surname,
      mat_surname: req.body.mat_surname,
      company: req.body.company,
      rfc: req.body.rfc,
      cfdi: req.body.cfdi,
      phone: req.body.phone,
      status: req.body.status,
      cdu: req.body.cdu,
      main_email: req.body.email,
    });

    const data = await newClient.save();

    const json = {
      response: 'OK',
      data,
    };
    res.status(201).send(json);
  }

  async update(req, res) {
    const Client = new ClientMdl({
      id: Number(req.param('id')),
      name: req.body.name,
      photo: req.body.photo,
      sec_name: req.body.sec_name,
      pat_surname: req.body.mat_surname,
      mat_surname: req.body.mat_surname,
      company: req.body.company,
      rfc: req.body.rfc,
      cfdi: req.body.cfdi,
      phone: req.body.phone,
      status: req.body.status,
      cdu: req.body.cdu,
      main_email: req.body.email,
    });

    const data = await Client.save();

    const json = {
      response: 'OK',
      data,
    };
    res.status(201).send(json);
  }

  async delete(req, res) {
    const Client = new ClientMdl({
      id: Number(req.param('id')),
    });

    const data = await Client.delete();

    const json = {
      response: 'OK',
      data,
    };
    res.status(201).send(json);
  }
}

module.exports = new clientCtrl();
