const db = require('../db');
const { UserMdl } = require('../models');
const { Responses } = require('../models');
const listEmailCtrl = require('./listEmailCtrl');
const workerCtrl = require('./workerCtrl');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

/**
 * [processResult description]
 * @param  {[type]}   data [description]
 * @param  {Function} next [description]
 * @return {Promise}       [description]
 */
  async processResult(data, next) {
    try {
      let temp;
      let result = [];
      for (const res of data) {
        temp = new UserMdl(res);
        temp.list_email = await listEmailCtrl.getAll({ id_user: temp.id }, next);
        if(temp.type === 'ADMIN' || temp.type === 'SELLER') {
          temp.worker = await workerCtrl.get({ id_user: temp.id }, next);
        }
        if(temp.list_email && !temp.list_email.length){
          delete temp.list_email;
        }
        if(!temp.worker){
          delete temp.worker;
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

      let data = await UserMdl.select(
        '_User_',
        [
          'id',
          'photo',
          'name',
          'sec_name',
          'pat_surname',
          'mat_surname',
          'company',
          'type',
          'rfc',
          'cfdi',
          'country',
          'lada',
          'phone',
          'status',
          'main_email',
          'date',
          'updated',
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
        res.status(409).send(Responses.notFound('user'));
      } else {
        const total = await UserMdl.count(
          '_User_',
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
      let data = await UserMdl.select(
        '_User_',
        [
          'id',
          'photo',
          'name',
          'sec_name',
          'pat_surname',
          'mat_surname',
          'company',
          'type',
          'rfc',
          'cfdi',
          'country',
          'lada',
          'phone',
          'status',
          'main_email',
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

      [data] = await this.processResult(data, next);

      if (!data) {
        res.status(404).send(Responses.notFound('user'));
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let result = await new UserMdl(req.body).save();
      if (result) {
        if (listEmailCtrl.create({ id_user: result, email: req.body.main_email }, next)) {
          res.status(201).send(Responses.created('User'));
        } else {
          res.status(500).send(Responses.cantCreate('Email'));
        }
      } else {
        return res.status(500).send(Responses.cantCreate('User'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let new_list_email = [];
      console.log('Hi');
      if (req.body.list_email) {
        console.log('Hi2');
        new_list_email = listEmailCtrl.processResult(req.body.list_email, next);
        console.log('A0',new_list_email);
      }
      delete req.body['list_email'];

      const User = new UserMdl(req.body);
      User.id = Number(req.param('id'));
      console.log('A',new_list_email);
      let old_list_email = await listEmailCtrl.getAll({ id_user: User.id }, next);
      console.log('B',old_list_email);
      for(const n_email in new_list_email) {
        new_list_email[n_email].id_user = User.id;
        for(const o_email in old_list_email) {
          if (new_list_email[n_email] && old_list_email[o_email] && new_list_email[n_email].email === old_list_email[o_email].email) {
            new_list_email[n_email].number = old_list_email[o_email].number;
            await listEmailCtrl.update(new_list_email[n_email], next);
            delete new_list_email[n_email];
            delete old_list_email[o_email];
          }
        }
      }
      console.log('AA',new_list_email);
      console.log('BB',old_list_email);
      for(const n_email in new_list_email){
        await listEmailCtrl.create(new_list_email[n_email], next);
      }
      for(const o_email in old_list_email){
        old_list_email[o_email].id_user = User.id;
        old_list_email[o_email].status = 0;
        await listEmailCtrl.update(old_list_email[o_email], next);
      }

      if (req.body.worker && req.body.worker !== undefined && req.body.worker !== null){
        let temp = req.body.worker;
        temp.id_user = User.id;
        if (User.type === 'ADMIN' || User.type === 'SELLER') {
          workerCtrl.create(temp, next);
        } else {
          workerCtrl.delete(temp, next);
        }
      } else {
        workerCtrl.delete({id_user: User.id}, next);
      }

      const result = await User.update();

      if(!result){
        res.status(500).send(Responses.cantRegister('User'));
      } else {
        res.status(200).send(Responses.updated('User'));
      }
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const User = new UserMdl({
        id: Number(req.param('id')),
      });

      const result = await User.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('User'));
      } else {
        res.status(200).send(Responses.deleted('User'));
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserCtrl();
