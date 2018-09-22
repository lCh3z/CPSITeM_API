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
    let result = [];
    data.forEach((res) => {
      result.push(new ClientMdl(res));
    });
    return result;
  }

  async getAll(req, res) {
    this.data = await db.getAll('_Client_');
    this.data = this.processResult(this.data);
    const json = {
      response: 'OK',
      data: this.data,
    };
    res.send(json);
  }

  async get(req, res) {
    this.data = await db.get('_Client_', req.params.id);
    this.data = this.processResult(this.data);
    const json = {
      response: 'OK',
      data: this.data,
    };
    res.send(json);

  }

  create(req, res) {
    const data = {
      name : req.param('name'),
      photo : req.param('photo'),
      sec_name : req.param('sec_name'),
      pat_surname : req.param('mat_surname'),
      mat_surname : req.param('mat_surname'),
      company : req.param('company'),
      rfc : req.param('rfc'),
      cfdi : req.param('cfdi'),
      phone : req.param('phone'),
      business_name : req.param('business_name'),
      status : req.param('status'),
      list_email : req.param('list_email'),
      cdu : req.param('cdu'),
      main_email : req.param('main_email')
    };
    this.data = db.create('_Client_', data);
    const json = {
      response : 'OK',
      data : this.data,
    };
    res.status(201).send(json);

  }

  async update(req, res) {
    const self = this;
    const data = {
      id : Number(req.param('id')),
      name : req.param('name') === undefined ? 'Missing' : req.param('name'),
      photo : req.param('photo') === undefined ? 'Missing' : req.param('photo'),
      sec_name : req.param('sec_name') === undefined ? 'Missing' : req.param('sec_name'),
      pat_surname : req.param('mat_surname') === undefined ? 'Missing' : req.param('pat_surname'),
      mat_surname : req.param('mat_surname') === undefined ? 'Missing' : req.param('mat_surname'),
      company : req.param('company') === undefined ? 'Missing' : req.param('company'),
      rfc : req.param('rfc') === undefined ? 'Missing' : req.param('rfc'),
      cfdi : req.param('cfdi') === undefined ? 'Missing' : req.param('cfdi'),
      phone : req.param('phone') === undefined ? 'Missing' : req.param('phone'),
      business_name : req.param('business_name') === undefined ? 'Missing' : req.param('business_name'),
      status : req.param('status') === undefined ? false : req.param('status'),
      list_email : req.param('list_email') === undefined ? 'Missing' : req.param('list_email'),
      cdu : req.param('cdu') === undefined ? 'Missing' : req.param('cdu'),
      main_email : req.param('main_email') === undefined ? 'Missing' : req.param('main_email'),
    };
    this.data = await db.update('_Client_', data);
    const json = {
      response : 'OK',
      data : this.data,
    };
    res.status(201).send(json);
  }

  delete(req, res) {
    const data = {
      id: req.param('id'),
    }
    this.data = db.delete('_Client_', data);
    const json = {
      response : 'OK',
      data : this.data
    };
    res.status(201).send(json);
  }
}
module.exports = new clientCtrl();
