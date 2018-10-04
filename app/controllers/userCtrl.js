const db = require('../db');
const { UserMdl, Responses } = require('../models');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res, next) {
    try {
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
          'date',
          'updated',
        ],
        null,
        null,
        {
          start,
          quant: per_page,
        },
      );

      if (data.length === 0) {
        res.status(409).send(Responses.notFound('user'));
      } else {
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
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
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
          'date',
          'updated',
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

      if (!data) {
        res.status(404).send(Responses.notFound('user'));
      } else {
        [data] = data;
        res.status(200).send({ data });
      }
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const User = new UserMdl(req.body);
      let result = await User.save();
      if (result) {
        res.status(201).send(Responses.created('user'));
        result = User.saveListEmail(req.body.list_email);
        if (result) {
          res.status(201).send(Responses.updated('email'));
        } else {
          res.status(500).send(Responses.cantCreate('email'));
        }
      } else {
        return res.status(500).send(Responses.cantCreate('user'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const User = new UserMdl(req.body);
      User.id = Number(req.param('id'));

      const result = await User.update(req.body.list_email, req.body.worker, req.body.list_addresses);

      if(!result){
        res.status(500).send(Responses.cantCreate('user'));
      } else {
        res.status(200).send(Responses.updated('user'));
      }
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const User = new UserMdl({
        id: Number(req.param('id')),
      });

      const result = await User.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('user'));
      } else {
        res.status(200).send(Responses.deleted('user'));
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserCtrl();
