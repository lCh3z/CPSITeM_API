const db = require('../db');

class WorkerMdl {
  constructor(args) {
    this.id_user =  args.id_user;
    this.position = args.position;
    this.depart = args.depart;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new WorkerMdl(res));
    });
    return result;
  }

  async save() {
    // Object.keys(this).forEach(key => this[key] === undefined && key !== 'sec_name' && key !== 'photo' && key !== 'company' && delete this[key]);
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id_user !== undefined && this.processResult(await db.get('_Worker_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) return this.update();
    if (await db.create('_Worker_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id_user !== undefined && await db.update('_Worker_', this, [{ attr: 'id_user', oper: '=', val: this.id_user }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id_user !== undefined && this.processResult(await db.get('_Worker_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) {
      if (this.id_user !== undefined && await db.delete('_Worker_', [{ attr: 'id_user', oper: '=', val: this.id_user }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = WorkerMdl;
