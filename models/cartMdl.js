const db = require('../db');

class CartMdl {
  constructor(args) {
    this.id_user =  args.id_user;
    this.id_product  = args.id_product ;
    this.quantity = args.quantity;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new CartMdl(res));
    });
    return result;
  }

  async save() {
    // Object.keys(this).forEach(key => this[key] === undefined && key !== 'sec_name' && key !== 'photo' && key !== 'company' && delete this[key]);
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id_user !== undefined && this.processResult(await db.get('_Cart_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) return this.update();
    if (await db.create('_Cart_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id_user !== undefined && await db.update('_Cart_', this, [{ attr: 'id_user', oper: '=', val: this.id_user }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id_user !== undefined && this.processResult(await db.get('_Cart_', 'id_user', [{ attr: 'id_user', oper: '=', val: this.id_user }])).length !== 0) {
      if (this.id_user !== undefined && await db.delete('_Cart_', [{ attr: 'id_user', oper: '=', val: this.id_user }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = CartMdl;
