const db = require('../db');
const { CartMdl, Responses } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado

class cartCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data, next) {
    const result = [];
    data.forEach((res) => {
      result.push(new CartMdl(res));
    });
    return result;
  }

  async getAll(req, res, next) {
    try {
      let data = await CartMdl.select(
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

      data = this.processResult(data, next);

      if (data.length === 0) {
        res.status(409).send(Responses.notFound('cart'));
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'))
      let result = await Cart.save();
      if (result) {
        res.status(201).send(Responses.created('cart'));
      } else {
        return res.status(500).send(Responses.cantCreate('cart'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let Cart = new CartMdl(req.body);
      Cart.id_user = Number(req.param('id'))
      Cart.id_product = Number(req.param('id_product'))
      const result = await Cart.save();
      if (result) {
        res.status(200).send(Responses.updated('cart'));
      } else {
        return res.status(500).send(Responses.cantUpdate('cart'));
      }
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const Cart = new CartMdl({
        id_user: Number(req.param('id')),
        id_product: Number(req.param('id_product')),
      });

      const result = await Cart.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('cart'));
      } else {
        res.status(200).send(Responses.deleted('cart'));
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new cartCtrl();
