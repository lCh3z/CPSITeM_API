const db = require('../db');
const { WishListMdl, Responses } = require('../models');

class wishListCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data, next) {
    const result = [];
    data.forEach((res) => {
      result.push(new WishListMdl(res));
    });
    return result;
  }

  async getAll(req, res, next) {
    try {
      let data = await WishListMdl.select(
        '_WishList_',
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
        res.status(409).send(Responses.notFound('wishlist'));
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      let WishList = new WishListMdl(req.body);
      WishList.id_user = Number(req.param('id'))
      let result = await WishList.save();
      if (result) {
        res.status(201).send(Responses.created('wishlist'));
      } else {
        return res.status(500).send(Responses.cantRegister('wishlist'));
      }
    } catch (e) {
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const WishList = new WishListMdl({
        id_user: Number(req.param('id')),
        id_product: Number(req.param('id_product')),
      });

      const result = await WishList.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('wishlist'));
      } else {
        res.status(200).send(Responses.deleted('wishlist'));
      }
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = new wishListCtrl();
