const db = require('../db');
const { OrderMdl, Responses } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado

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
      // FIXME Toda la logica para definir los parametros para filtros, paginado y ordenado se puede meter en un middleware
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

      let data = await OrderMdl.select(
        '_Order_',
        [
          '*',
        ],
        filters,
        order,
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
        res.status(404).send(Responses.notFound('order'));
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
