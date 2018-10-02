const db = require('../db');
const { ImgProductMdl } = require('../models');

class imgProductCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ImgProductMdl(res));
    });
    return result;
  }

  async getAll(inputs, next) {
    try {
      const data = await ImgProductMdl.select(
        '_Imgproduct_',
        [
          'id_prod',
          'photo',
          'status',
          'date',
          'updated',
        ],
        [
          {
            attr: 'id_prod',
            oper: '=',
            val: inputs.id_prod,
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
        '',
        '',
      );
      return this.processResult(data);
    } catch (e) {
      next(e);
    }
  }

  async get(inputs, next) {
    try {
      let data = await ImgProductMdl.select(
        '_Imgproduct_',
        [
          'id_prod',
          'photo',
          'status',
          'date',
          'updated',
        ],
        [
          {
            attr: 'id_prod',
            oper: '=',
            val: inputs.id_prod,
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
      return this.processResult(data)[0];
    } catch (e) {
      next(e);
    }
  }

  async create(inputs, next) {
    try {
      const newImgProduct = new ImgProductMdl(inputs);
      const result = await newImgProduct.save();
      return result;
    } catch (e) {
      next(e);
    }
  }

  async update(inputs, next) {
    try {
      const ImgProduct = new ImgProductMdl(inputs);
      const result = await ImgProduct.save();
      return result;
    } catch (e) {
      next(e);
    }
  }

  async delete(inputs, next) {
   try {
     input.status = 0;
     const ImgProduct = new ImgProductMdl(inputs);
     const result = await ImgProduct.delete();
     return result;
   } catch (e) {
     next(e);
   }
  }
}

module.exports = new imgProductCtrl();
