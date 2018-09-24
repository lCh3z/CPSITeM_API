const db = require('../db');

class ListEmailMdl {
  constructor(args) {
    this.id_user =  args.id_user;
    this.email = args.email;
    this.status = args.status;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ListEmailMdl(res));
    });
    return result;
  }

  async save() {
    // Object.keys(this).forEach(key => this[key] === undefined && key !== 'sec_name' && key !== 'photo' && key !== 'company' && delete this[key]);
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id_user !== undefined && this.processResult(await db.get('_ListEmail_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) return this.update();
    if (await db.create('_ListEmail_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id_user !== undefined && await db.update('_ListEmail_', this, [{ attr: 'id_user', oper: '=', val: this.id_user }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id_user !== undefined && this.processResult(await db.get('_ListEmail_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) {
      if (this.id_user !== undefined && await db.delete('_ListEmail_', [{ attr: 'id_user', oper: '=', val: this.id_user }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = ListEmailMdl;
