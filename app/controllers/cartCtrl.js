const { CartMdl, Response } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado

class cartCtrl {
  constructor() {
    this.table = 'cart';
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res, next) {
    const response = new Response();
    try {
      const data = await CartMdl.select(
        '_Cart_',
        [
          '*',
        ],
        [
          {
            attr: 'id_user',
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
      const Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'));
      if (!await Cart.save()) {
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
      const Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'));
      Cart.id_product = Number(req.param('id_product'));
      if (!await Cart.save()) {
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
      const Cart = new CartMdl({
        id_user: Number(req.param('id')),
        id_product: Number(req.param('id_product')),
      });
      if (!await Cart.delete()) {
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

module.exports = new cartCtrl();
