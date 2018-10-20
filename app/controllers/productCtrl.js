const { ProductMdl, Responses } = require('../models');

class productCtrl {
  constructor() {
    this.table = 'product';
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

      const data = await ProductMdl.select(
        '_Product_',
        [
          'id',
          'id_cat',
          'price',
          'discount',
          'inventory',
          'description',
          'specs',
          'min_quan',
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
      } else {
        const total = await ProductMdl.count(
          '_Product_',
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
      let data = await ProductMdl.select(
        '_Product_',
        [
          'id',
          'id_cat',
          'price',
          'discount',
          'inventory',
          'description',
          'specs',
          'min_quan',
          'status',
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
      const Product = new ProductMdl(req.body);
      if (!await Product.save()) {
        response.bad()
          .setStatus(409)
          .cantCreate(this.table);
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
      const Product = new ProductMdl(req.body);
      Product.id = Number(req.param('id'));
      if (!await Product.save()) {
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
      const Product = new ProductMdl({
        id: Number(req.param('id')),
      });

      if (!await Product.delete()) {
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

module.exports = new productCtrl();
