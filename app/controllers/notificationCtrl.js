const db = require('../db');
const { NotificationMdl } = require('../models');
const { Responses } = require('../models');
class notificationCtrl{
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
        temp = new NotificationMdl(res);
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

      let data = await NotificationMdl.select(
        '_Notification_',
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
        res.status(500).send(Responses.notFound('Notification'));
      } else {
        const total = await NotificationMdl.count(
          '_Notification_',
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
      let data = await NotificationMdl.select(
        '_Notification_',
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
        res.status(500).send(Responses.notFound('Notification'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let result = await new NotificationMdl(req.body).save();
      if (result) {
        res.status(201).send(Responses.created('Notification'));

      } else {
        return res.status(500).send(Responses.cantCreate('Notification'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res){
    try {
      const Notification = new NotificationMdl(req.body);
      Notification.id = Number(req.param('id'));

      const result = await Notification.update();

      if(!result){
        res.status(500).send(Responses.cantRegister('Notification'));
      }
      res.status(201).send(Responses.updated('Notification'));
  } catch (e) {
    next(e);
  }
}

  async delete(req, res) {
    try {
      const Notification = new NotificationMdl({
        id: Number(req.param('id')),
      });

      const result = await Notification.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Notification'));
      }
      res.status(201).send(Responses.deleted('Notification'));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new notificationCtrl();
