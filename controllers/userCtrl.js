const db = require('../db');
const { UserMdl } = require('../models');
const { Responses } = require('../models');
const listEmailCtrl = require('./listEmailCtrl');
const workerCtrl = require('./workerCtrl');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  async processResult(data) {
    let temp;
    let result = [];
    for (const res of data) {
      temp = new UserMdl(res);
      temp.list_email = await listEmailCtrl.getAll({ id_user: temp.id });
      if(temp.type === 'ADMIN' || temp.type === 'SELLER') {
        temp.worker = await workerCtrl.get({ id_user: temp.id });
      }
      if(temp.list_email && !temp.list_email.length){
        delete temp.list_email;
      }
      if(temp.worker && !temp.worker.length){
        delete temp.worker;
      }
      result.push(temp);
    }
    return result;
  }

  async getAll(req, res) {
    const page = parseInt(req.param('page'));
    const per_page = parseInt(req.param('per_page'));
    const start = page * per_page;

    let data = await UserMdl.select(
      '_User_',
      [
        'id',
        'photo',
        'name',
        'sec_name',
        'pat_surname',
        'mat_surname',
        'company',
        'type',
        'rfc',
        'cfdi',
        'country',
        'lada',
        'phone',
        'status',
        'main_email',
      ],
      null,
      null,
      {
        start,
        quant: per_page,
      },
    );

    data = await this.processResult(data);

    if (data.length === 0) {
      res.status(400).send(Responses.notFound('User'));
    }

    const total = await UserMdl.count(
      '_User_',
      '',
      '',
    );

    res.status(200).send({
      data,
      per_page,
      page,
      total,
    });
  }

  async get(req, res) {
    let data = await UserMdl.select(
      '_User_',
      [
        'id',
        'photo',
        'name',
        'sec_name',
        'pat_surname',
        'mat_surname',
        'company',
        'type',
        'rfc',
        'cfdi',
        'country',
        'lada',
        'phone',
        'status',
        'main_email',
      ],
      [
        {
          attr: 'id',
          oper: '=',
          val: Number(req.param('id')),
        },
      ],
      null,
      null,
    );

    [data] = await this.processResult(data);

    if (!data) {
      res.status(400).send(Responses.notFound('User'));
    }
    res.status(201).send({ data });
  }

  async create(req, res) {
    let result = await new UserMdl(req.body).save();
    if (result) {
      if (listEmailCtrl.create({ id_user: result, email: req.body.main_email })) {
        res.status(201).send(Responses.created('User'));
      } else {
        res.status(400).send(Responses.cantCreate('Email'));
      }
    } else {
      return res.status(400).send(Responses.cantCreate('User'));
    }
  }

  async update(req, res) {
    let new_list_email = [];
    if (req.body.list_email) {
      new_list_email = listEmailCtrl.processResult(req.body.list_email);
    }
    delete req.body['list_email'];

    const User = new UserMdl(req.body);
    User.id = Number(req.param('id'));

    let old_list_email = await listEmailCtrl.getAll({ id_user: User.id });
    for(const n_email in new_list_email) {
      new_list_email[n_email].id_user = User.id;
      for(const o_email in old_list_email) {
        if (new_list_email[n_email] && old_list_email[o_email] && new_list_email[n_email].email === old_list_email[o_email].email) {
          new_list_email[n_email].number = old_list_email[o_email].number;
          await listEmailCtrl.update(new_list_email[n_email]);
          delete new_list_email[n_email];
          delete old_list_email[o_email];
        }
      }
    }
    for(const n_email in new_list_email){
      await listEmailCtrl.create(new_list_email[n_email]);
    }
    for(const o_email in old_list_email){
      old_list_email[o_email].id_user = User.id;
      old_list_email[o_email].status = 0;
      await listEmailCtrl.update(old_list_email[o_email]);
    }

    if (req.body.worker && req.body.worker !== undefined && req.body.worker !== null){
      let temp = req.body.worker;
      temp.id_user = User.id;
      if (User.type === 'ADMIN' || User.type === 'SELLER') {
        console.log(temp);
        workerCtrl.update(temp);
      } else {
        workerCtrl.delete(temp);
      }
    }

    const result = await User.update();

    if(!result){
      res.status(400).send(Responses.cantRegister('User'));
    }
    res.status(201).send(Responses.updated('User'));
  }

  async delete(req, res) {
    const User = new UserMdl({
      id: Number(req.param('id')),
    });

    const result = await User.delete();

    if(!result){
      res.status(400).send(Responses.cantDelete('User'));
    }
    res.status(201).send(Responses.deleted('User'));
  }
}

module.exports = new UserCtrl();
