const db = require('../db');
const { ListEmailMdl } = require('../models');
const { Responses } = require('../models');

class listEmailCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  static processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ListEmailMdl(res));
    });
    return result;
  }

  async getAll(req, res) {
    const data = await ListEmailMdl.select('_ListEmail_', ['id_user', 'email', 'status'], [{
      attr: 'id_user',
      oper: '=',
      val: Number(req.param('id_user')),
    }], '', '');
    // Was not found
    if (!data.length) {
      res.status(204).send(Responses.notFoud('email'));
    }
    // Found
    const json = {
      data,
    };
    res.status(200).send(json);
  }

  async get(req, res) {
    const data = await ListEmailMdl.get('_ListEmail_', ['id_user', 'email', 'status'], [{
      attr: 'email',
      oper: '=',
      val: req.param('id_user'),
    }], '', '');
    // Was not found
    if (data.length === 0) {
      res.status(204).send(Responses.notFoud('email'));
    }
    // Found
    const json = {
      data,
    };
    res.status(200).send(json);
  }

  async create(req, res) {
    const newListEmail = new ListEmailMdl(req.body);

    const result = await newListEmail.save();

    if (!result) {
      res.status(400).send(Responses.cantCreate('email'));
    }
    res.status(201).send(Responses.created('email'));
  }

  async update(req, res) {
    const ListEmail = new ListEmailMdl(req.body);
    ListEmail.id_user = req.param('id_user');

    const result = await ListEmail.save();

    if (!result) {
      res.status(404).send(Responses.cantUpdate('email'));
    }
    res.status(200).send(Responses.updated());
  }

  async delete(req, res) {
    const ListEmail = new ListEmailMdl({
      id_user: Number(req.param('id_user')),
    });

    const result = await ListEmail.delete();

    if (!result) {
      res.status(400).send(Responses.cantDelete());
    }
    res.status(200).send(Responses.deleted());
  }
}

module.exports = new listEmailCtrl();
