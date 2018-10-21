const { UserMdl, Response } = require('../models');

class UserCtrl {
  constructor() {
    this.table = 'user';
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res, next) {
    const response = new Response();
    try {
      let page = Number(req.param('page'));
      let per_page = Number(req.param('per_page'));
      if (!page) {
        page = 0;
      }
      if (!per_page) {
        per_page = 20;
      }

      const start = page * per_page;

      let find = Number(req.param('find'));
      let f_col = Number(req.param('f_col'));
      let filters = null;
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
      let ord = Number(req.param('order'));
      let ord_by = Number(req.param('ord_by'));
      let des = Number(req.param('desc'));
      if (ord && ord_by) {
        order = {};
        order.by =  ord_by;
        if (des) {
          order.desc = true;
        } else {
          order.desc = false;
        }
      }

      const data = await UserMdl.select(
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

      if (!data.length) {
        response.bad()
          .setStatus(204)
          .notFound(this.table);
      } else {
        const total = await UserMdl.count(
          '_User_',
          filters,
        );
        response.ok()
          .setStatus(200)
          .setData(data)
          .setPlus('per_page', per_page)
          .setPlus('page', page)
          .setPlus('total', total);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  async get(req, res, next) {
    const response = new Response();
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
          'main_email',
          'date',
          'updated',
          'status',
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

      if (!data.length) {
        response.bad()
          .setStatus(404)
          .notFound(this.table);
      } else {
        [data] = data;
        response.ok()
          .setStatus(200)
          .setData(data);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  async create(req, res, next) {
    const response = new Response();
    try {
      const User = new UserMdl(req.body);
      if (!await User.save(
        req.body.list_email,
        req.body.worker,
        req.body.list_addresses,
      )) {
        response.bad()
          .setStatus(409)
          .cantRegister(this.table);
      } else {
        response.ok()
          .setStatus(201)
          .registered(this.table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  async update(req, res, next) {
    const response = new Response();
    try {
      const User = new UserMdl(req.body);
      User.id = Number(req.param('id'));
      if (!await User.save(
        req.body.list_email,
        req.body.worker,
        req.body.list_addresses,
      )) {
        response.bad()
          .setStatus(409)
          .cantUpdate(this.table);
      } else {
        response.ok()
          .setStatus(200)
          .updated(this.table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }

  async delete(req, res, next) {
    const response = new Response();
    try {
      const User = new UserMdl({
        id: Number(req.param('id')),
      });

      if (!await User.delete()) {
        response.bad()
          .setStatus(404)
          .cantDelete(this.table);
      } else {
        response.ok()
          .setStatus(200)
          .deleted(this.table);
      }
    } catch (e) {
      return next(e);
    }
    return res.status(response.status).send(response);
  }
}

module.exports = new UserCtrl();
