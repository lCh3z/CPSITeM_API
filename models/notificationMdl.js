const db = require('../db');

class NotificationMdl {
  constructor(args){
    this.id = args.id;
    this.title = args.title;
    this.cont = args.cont;
    this.id_user = args.id_user;
    this.date = args.date;
    this.prog = args.prog;
    this.status = args.status;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new NotificationMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Notification_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Notification_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Notification_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Notification_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Notification_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = NotificationMdl;
