const db = require('../db');

class PaymentMdl {
  constructor(args){
    this.id = args.id;
    this.id_client = args.id_client;
    this.account = args.account;
    this.token = args.token;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new PaymentMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Payment_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Payment_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Payment_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Payment_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Payment_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = PaymentMdl;
