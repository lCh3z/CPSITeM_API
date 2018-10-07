const db = require('../db');
const { OrderMdl, Responses } = require('../models');

class orderCtrl {
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

      let data = await OrderMdl.select(
        '_Order_',
        [
          '*',
        ],
        null,
        null,
        {
          start,
          quant: per_page,
        },
      );

      if (data.length === 0) {
        res.status(500).send(Responses.notFound('order'));
      } else {
        const total = await OrderMdl.count(
          '_Order_',
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
      let data = await OrderMdl.select(
        '_Order_',
        [
          '*',
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

      [data] = data;

      if (!data) {
        res.status(500).send(Responses.notFound('order'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const Order = new OrderMdl(req.body);
      let result = Order.save(req.body.list_prod);
      if (result) {
        res.status(201).send(Responses.created('order'));

      } else {
        return res.status(500).send(Responses.cantCreate('order'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const Order = new OrderMdl(req.body);
      Order.id = Number(req.param('id'));

      const result = await Order.update(req.body.list_prod);

      if(!result){
        res.status(500).send(Responses.cantRegister('order'));
      }
      res.status(201).send(Responses.updated('order'));
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    try {
      const Order = new OrderMdl({
        id: Number(req.param('id')),
      });

      const result = await Order.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('order'));
      }
      res.status(201).send(Responses.deleted('order'));
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new orderCtrl();
