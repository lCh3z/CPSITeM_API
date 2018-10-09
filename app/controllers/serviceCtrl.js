const { ServiceMdl, Responses } = require('../models');

class serviceCtrl {
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

      let data = await ServiceMdl.select(
        '_Service_',
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
        res.status(500).send(Responses.notFound('Service'));
      } else {
        const total = await ServiceMdl.count(
          '_Service_',
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
      let data = await ServiceMdl.select(
        '_Service_',
        [
          '*',
        ],
        [
          {
            attr: 'id',
            oper: '=',
            val: Number(req.param('id')),
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

      [data] = data;

      if (!data) {
        res.status(500).send(Responses.notFound('Service'));
      } else {
        res.status(201).send({ data });
      }
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const Service = new ServiceMdl(req.body);
      const result = await Service.save(req.body.stat_service);
      if (result) {
        return res.status(201).send(Responses.created('Service'));
      } else {
        return res.status(500).send(Responses.cantCreate('Service'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next){
    try {
      const Service = new ServiceMdl(req.body);
      Service.id = Number(req.param('id'));

      const result = await Service.update(req.body.stat_service);

      if(!result){
        res.status(500).send(Responses.cantUpdate('Service'));
      } else {
        res.status(201).send(Responses.updated('Service'));
      }
  } catch (e) {
    next(e);
  }
}

  async delete(req, res, next) {
    try {
      const Service = new ServiceMdl({
        id: Number(req.param('id')),
      });

      const result = await Service.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Service'));
      } else {
        res.status(201).send(Responses.deleted('Service'));
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new serviceCtrl();
