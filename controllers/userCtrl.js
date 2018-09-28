const db = require('../db');
const { UserMdl } = require('../models');
const { Responses } = require('../models');
const { ListEmailMdl } = require('../models');

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
    let list_email;
    let temp;
    let result = [];
    let emails = [];
    for (const res of data) {
      emails = []
      temp = new UserMdl(res);
      list_email = await ListEmailMdl.select('_ListEmail_', ['email', 'status'], [{
        attr: 'id_user',
        oper: '=',
        val: temp.id,
      }], '', '');
      list_email.forEach((email) => {
        emails.push(new ListEmailMdl(email));
      });
      temp.list_email = emails
      result.push(temp);
    }

    return result;
  }

  async getAll(req, res) {
    const page = parseInt(req.param('page'));
    const per_page = parseInt(req.param('per_page'));
    const start = page * per_page;

    let data = await UserMdl.select('_User_', ['id', 'photo', 'name', 'sec_name', 'pat_surname', 'mat_surname', 'company', 'rfc', 'cfdi', 'country', 'lada', 'phone', 'status', 'main_email'], '', '', { start, quant: per_page });

    data = await this.processResult(data);

    if (data.length === 0) {
      res.status(400).send(Responses.notFound('User'));
    }

    let total = await UserMdl.count('_User_', '', '');
    total = total['COUNT(*)'];
    res.status(200).send({
      data,
      per_page,
      page,
      total,
    });
  }

  async get(req, res) {
    let data = await UserMdl.get('_User_', ['id', 'photo', 'name', 'sec_name', 'pat_surname', 'mat_surname', 'company', 'rfc', 'cfdi', 'country', 'lada', 'phone', 'status', 'main_email'], [{
      attr: 'id',
      oper: '=',
      val: Number(req.param('id'))
    }]);
    data = this.processResult(data)[0];

    if(!data){
      res.status(400).send(Responses.notFound('User'));
    }
    res.status(201).send({ data });
  }

  async create(req, res) {
    const result = await new UserMdl(req.body).save();

    if(!result){
      res.status(400).send(Responses.cantCreate('User'));
    }
    res.status(201).send(Responses.created('User'));
  }

  async update(req, res) {
    const User = new UserMdl(req.body);
    User.id = req.param('id');

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
