const { WishListMdl, Responses } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado

class wishListCtrl{
  constructor(){
    this.table = 'wishlist';
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res, next) {
    const response = new Response();
    try{
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

      const data = await WishListMdl.select(
        '_WishList_',
        [
          'id_user',
          'id_product',
          'status',
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
      } else{
        const total = await WishListMdl.count(
          '_WishList_',
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


  async create(req, res, next){
    const response = new Response();
    try {
      const WishList = new WishListMdl(req.body);
      if (!await WishList.save()) {
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

  async delete(req, res, next) {
    const response = new Response();
    try {
      const WishList = new WishListMdl({
        id_user: Number(req.param('id_user')),
      });

      if (!await WishList.delete()) {
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

module.exports = new wishListCtrl();
