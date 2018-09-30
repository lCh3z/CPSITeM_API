const db = require('../db');

class WorkerMdl {
  constructor(
    {
      id_user,
      position,
      depart,
    },
  ) {
    this.id_user =  id_user;
    this.position = position;
    this.depart = depart;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new WorkerMdl(res));
    });
    return result;
  }

  static async select(table, columns, filters, order, limit) {
    const data = await db.select(table, columns, filters, order, limit);
    const response = [];
    data.forEach((res) => {
      response.push(new WorkerMdl(res));
    });
    return response;
  }

  async save() {
    if (this.id_user !== undefined && this.processResult(await db.select('_Worker_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }], null, null)).length !== 0) return this.update();
    if (await db.create('_Worker_', this)) return true;
    return false;
  }

  async update() {
    if (this.id_user !== undefined && await db.update('_Worker_', this, [{ attr: 'id_user', oper: '=', val: this.id_user }])) return true;
    return false;
  }

  async delete() {
    if (this.id_user !== undefined && this.processResult(await db.select('_Worker_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }], null, null)).length !== 0) {
      if (this.id_user !== undefined && await db.delete('_Worker_', [{ attr: 'id_user', oper: '=', val: this.id_user }]) !== undefined) return true;
    }
    return false;
  }
}

module.exports = WorkerMdl;
