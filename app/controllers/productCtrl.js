const db = require('../db');
const { ProductMdl, Responses } = require('../models');
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
      const page = parseInt(req.param('page'));
      const per_page = parseInt(req.param('per_page'));
      const start = page * per_page;

      let data = await ProductMdl.select(
        '_Product_',
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
