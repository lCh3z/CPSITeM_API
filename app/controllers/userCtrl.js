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
      let page = parseInt(req.param('page'));
      let per_page = parseInt(req.param('per_page'));
      if (!page) {
        page = 0;
      }
      if (!per_page) {
        per_page = 20;
      }

      const start = page * per_page;

      let find = parseInt(req.param('find'));
      let f_col = parseInt(req.param('f_col'));
      const filters = null;
      if (find && f_col) {
        filters = [];
        filters.push(
          {
            attr: f_col,
            oper: 'LIKE',
            val: find,
          },
        );
      }

      let order = null;
      let ord = parseInt(req.param('order'));
      let ord_by = parseInt(req.param('ord_by'));
      let des = parseInt(req.param('desc'));
      if (ord && ord_by) {
        order = {};
        order.by =  ord_by;
        if (des) {
          order.desc = true;
        } else {
          order.desc = false;
        }
      }

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
        filters,
        order,
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
