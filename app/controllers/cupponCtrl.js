const db = require('../db');
const { CupponMdl } = require('../models');
const { Responses } = require('../models');

class cupponCtrl{
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
        temp = new CupponMdl(res);
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

      let data = await CupponMdl.select(
        '_Cuppon_',
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

      data = await this.processResult(data, next);

      if (data.length === 0) {
        res.status(500).send(Responses.notFound('Cuppon'));
      } else {
        const total = await CupponMdl.count(
          '_Cuppon_',
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
      let data = await CupponMdl.select(
        '_Cuppon_',
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

      [data] = await this.processResult(data, next);

      if (!data) {
        res.status(500).send(Responses.notFound('Cuppon'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let result = await new CupponMdl(req.body).save();
      if (result) {
        res.status(201).send(Responses.created('Cuppon'));
      } else {
        return res.status(500).send(Responses.cantCreate('Cuppon'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res){
    try {
      const Cuppon = new CupponMdl(req.body);
      Cuppon.id = Number(req.param('id'));

      const result = await Cuppon.update();

      if(!result){
        res.status(500).send(Responses.cantRegister('Cuppon'));
      }
      res.status(201).send(Responses.updated('Cuppon'));
  } catch (e) {
    next(e);
  }
}

  async delete(req, res) {
    try {
      const Cuppon = new CupponMdl({
        id: Number(req.param('id')),
      });

      const result = await Cuppon.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Cuppon'));
      }
      res.status(201).send(Responses.deleted('Cuppon'));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new cupponCtrl();
