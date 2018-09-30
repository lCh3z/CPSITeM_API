const db = require('../db');
const { ListEmailMdl } = require('../models');
const { Responses } = require('../models');

class listEmailCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      console.log('RES', res);
      result.push(new ListEmailMdl(res));
    });
    return result;
  }

  async getAll(inputs, next) {
    try {
      const data = await ListEmailMdl.select(
        '_ListEmail_',
        [
          'email',
          'number',
          'status',
          'date',
          'updated',
        ],
        [
          {
            attr: 'id_user',
            oper: '=',
            val: inputs.id_user,
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
      let data = await ListEmailMdl.select(
        '_ListEmail_',
        [
          'email',
          'number',
          'status',
          'date',
          'updated',
        ],
        [
          {
            attr: 'id_user',
            oper: '=',
            val: inputs.id_user,
          },
          {
            logic: 'and',
            attr: 'number',
            oper: '=',
            val: inputs.number,
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

      [data] = this.processResult(data);
      return data;
    } catch (e) {
      next(e);
    }
  }

  async create(inputs, next) {
    try {
      let last_num = await ListEmailMdl.max(
        '_ListEmail_',
        'number',
        [
          {
            attr: 'id_user',
            oper: '=',
            val: inputs.id_user,
          },
        ],
      );
      if (!last_num) {
        last_num = 1;
      } else {
        last_num += 1;
      }
      inputs.number = last_num;
      const newListEmail = new ListEmailMdl(inputs);
      const result = await newListEmail.save();
      return result;
    } catch (e) {
      next(e);
    }
  }

  async update(inputs, next) {
    try {
      const newListEmail = new ListEmailMdl(inputs);
      const result = await newListEmail.save();
      return result;
    } catch (e) {
      next(e);
    }
  }

  async delete(inputs, next) {
    try {
      input.status = 0;
      const newListEmail = new ListEmailMdl(inputs);
      const result = await newListEmail.save();
      return result;
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new listEmailCtrl();
