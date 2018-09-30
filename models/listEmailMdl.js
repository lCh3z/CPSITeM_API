const db = require('../db');

class ListEmailMdl {
  constructor(
    {
      id_user,
      email,
      number,
      status,
    },
  ) {
    this.id_user = id_user;
    this.email = email;
    this.number = number;
    this.status = status;
  }

  static async select(table, columns, filters, order, limit) {
    const data = await db.select(table, columns, filters, order, limit);
    const response = [];
    data.forEach((res) => {
      response.push(new ListEmailMdl(res));
    });
    return response;
  }

  static async max(table, column, filters) {
    const data = await db.max(table, column, filters);
    return data[0].max;
  }

  async save() {
    const exists = await db.select(
      '_ListEmail_',
      [
        'id_user',
      ],
      [
        {
          attr: 'id_user',
          oper: '=',
          val: this.id_user,
        },
        {
          logic: 'and',
          attr: 'email',
          oper: '=',
          val: this.email,
        },
      ],
      null,
      null,
    );
    if (this.id_user !== undefined && exists.length !== 0) {
      delete this.email;
      return this.update();
    }
    if (await db.create('_ListEmail_', this)) {
      return true;
    }
    return false;
  }

  async update() {
    if (this.id_user !== undefined && await db.update(
      '_ListEmail_',
      this,
      [
        {
          attr: 'id_user',
          oper: '=',
          val: this.id_user,
        },
        {
          logic: 'and',
          attr: 'number',
          oper: '=',
          val: this.number,
        },
      ],
    )) {
      return true;
    }
    return false;
  }

  async delete() {
    this.status = 10;
    this.update();
    return false;
  }
}

module.exports = ListEmailMdl;
