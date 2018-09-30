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
      result.push(new ListEmailMdl(res));
    });
    return result;
  }

  async getAll(inputs) {
    const data = await ListEmailMdl.select(
      '_ListEmail_',
      [
        'email',
        'number',
        'status',
      ],
      [
        {
          attr: 'id_user',
          oper: '=',
          val: inputs.id_user,
        },
      ],
      '',
      '',
    );
    // Was not found
    return this.processResult(data);
  }

  async get(inputs) {
    let data = await ListEmailMdl.select(
      '_ListEmail_',
      [
        'email',
        'number',
        'status',
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
      ],
      '',
      '',
    );

    [data] = this.processResult(data);
    return data;
  }

  async create(inputs) {
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
    console.log('NUM', last_num);
    if (!last_num) {
      last_num = 1;
    } else {
      last_num += 1;
    }
    inputs.number = last_num;
    const newListEmail = new ListEmailMdl(inputs);
    const result = await newListEmail.save();
    return result;
  }

  async update(inputs) {
    const newListEmail = new ListEmailMdl(inputs);
    const result = await newListEmail.save();
    return result;
  }

  async delete(inputs) {
    input.status = 10;
    const newListEmail = new ListEmailMdl(inputs);
    const result = await newListEmail.save();
    return result;
  }
}

module.exports = new listEmailCtrl();
