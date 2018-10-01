const db = require('../db');

class CupponMdl {
  constructor(args){
    this.id = args.id;
    this.discount = args.discount;
    this.star = args.star;
    this.end = args.end;
    this.description = args.description;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new CupponMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Cuppon_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Cuppon_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Cuppon_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Cuppon_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Cuppon_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }

}

module.exports = CupponMdl;
