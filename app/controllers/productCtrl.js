const db = require('../db');
const { ProductMdl } = require('../models');
const { Responses } = require('../models');
const imgProductCtrl = require('./imgProductCtrl');
class productCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  async processResult(data, next) {
    try {
      let temp;
      let result = [];
      for (const res of data) {
        temp = new ProductMdl(res);
        temp.img_product = await imgProductCtrl.getAll({ id_prod : temp.id_prod }, next);
        if(!temp.img_product){
          delete temp.img_product;
        }
        result.push(temp);
      }
      return result;
    } catch (e) {
      next(e);
    }
  }


  async getAll(req, res, next) {
    try {
      const page = parseInt(req.param('page'));
      const per_page = parseInt(req.param('per_page'));
      const start = page * per_page;

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
        null,
        null,
        {
          start,
          quant: per_page,
        },
      );

      data = await this.processResult(data, next);

      if (data.length === 0) {
        res.status(500).send(Responses.notFound('Product'));
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

      [data] = await this.processResult(data, next);

      if (!data) {
        res.status(500).send(Responses.notFound('Product'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let result = await new ProductMdl(req.body).save();
      if (result) {
        if(imgProductCtrl.create({ id_prod: result }, next)){
          res.status(201).send(Responses.created('Product'));
        } else{
          res.status(500).send(Responses.cantCreate('ImgProduct'));
        }

      } else {
        return res.status(500).send(Responses.cantCreate('Product'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res){
    try {
      const Product = new ProductMdl(req.body);
      Product.id = Number(req.param('id'));

      const result = await Product.update();

      if(!result){
        res.status(500).send(Responses.cantRegister('Product'));
      }
      res.status(201).send(Responses.updated('Product'));
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
}

module.exports = new productCtrl();
