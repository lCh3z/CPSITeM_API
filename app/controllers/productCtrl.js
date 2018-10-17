const db = require('../db');
const { ProductMdl, Responses } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado

class productCtrl {
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

      let data = await ProductMdl.select(
        '_Product_',
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
        res.status(500).send(Responses.notFound('product'));
      } else {
        const total = await ProductMdl.count(
          '_Product_',
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
      let data = await ProductMdl.select(
        '_Product_',
        [
          'id',
          'id_cat',
          'name',
          'price',
          'status',
          'discount',
          'inventory',
          'description',
          'specs',
          'min_quan',
          'date',
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
        res.status(500).send(Responses.notFound('product'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const Product = new ProductMdl(req.body)
      let result = await Product.save(req.body.list_imgs);
      if (result) {
        return res.status(201).send(Responses.created('product'));
      } else {
        return res.status(500).send(Responses.cantCreate('product'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res){
    try {
      const Product = new ProductMdl(req.body);
      Product.id = Number(req.param('id'));

      const result = await Product.update(req.body.list_imgs);

      if(!result){
        res.status(500).send(Responses.cantRegister('product'));
      }
      res.status(201).send(Responses.updated('product'));
  } catch (e) {
    next(e);
  }
}

  async delete(req, res) {
    try {
      const Product = new ProductMdl({
        id: Number(req.param('id')),
      });

      const result = await Product.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Product'));
      }
      res.status(201).send(Responses.deleted('Product'));
    } catch (e) {
      next(e);
    }
  }

  async getImgProduct() {
    const result = await db.select(
      '_ImgProduct_',
      [
        'id_prod',
      ],
      [
        {
          attr: 'id_prod',
          oper: '=',
          val: this.id_prod,
        },
        {
          logic: 'and',
          attr: 'status',
          oper: '!=',
          val: 0,
        },
      ],
      null,
      null,
    );

  }
}

module.exports = new productCtrl();
