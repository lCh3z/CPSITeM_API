const db = require('../db');

class ListEmailMdl {
  constructor({ id_user, email, status }) {
    this.id_user = id_user;
    this.email = email;
    this.status = status;
  }

  static async select(table, columns, filters, order, limit) {
    const data = await db.getAll(table, columns, filters, order, limit);
    const response = [];
    data.forEach((res) => {
      response.push(new ListEmailMdl(res));
    });
    return response;
  }

  static async get(table, columns, filters, order, limit) {
    const data = await db.get(table, columns, filters, order, limit);
    return data[0];
  }

  async save() {
    if (this.id_user !== undefined && this.processResult(await db.get('_ListEmail_', ['id_user'], [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) return this.update();
    if (await db.create('_ListEmail_', this)) return this;
    return false;
  }

  async update() {
    if (this.id_user !== undefined && await db.update('_ListEmail_', this, [{ attr: 'id_user', oper: '=', val: this.id_user }])) return this;
    return false;
  }

  async delete() {
    if (this.id_user !== undefined && this.processResult(await db.get('_ListEmail_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) {
      if (this.id_user !== undefined && await db.delete('_ListEmail_', [{ attr: 'id_user', oper: '=', val: this.id_user }]) !== undefined) return this;
    }
    return false;
  }
}

module.exports = ListEmailMdl;
