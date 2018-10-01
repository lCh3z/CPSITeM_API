const db = require('../db');

class ListProdMdl {
  constructor(args) {
    this.id_order =  args.id_order;
    this.id_product = args.id_product;
    this.quantity = args.quantity;
    this.price = args.price;
    this.date = args.date;

  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ListProdMdl(res));
    });
    return result;
  }

  async save() {
    // Object.keys(this).forEach(key => this[key] === undefined && key !== 'sec_name' && key !== 'photo' && key !== 'company' && delete this[key]);
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id_order !== undefined && this.processResult(await db.get('_ListProd_', 'id_order', [{ attr: 'id_order', oper: '=', val: this.id_order }])).length !== 0) return this.update();
    if (await db.create('_ListProd_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id_order !== undefined && await db.update('_ListProd_', this, [{ attr: 'id_order', oper: '=', val: this.id_order }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id_order !== undefined && this.processResult(await db.get('_ListProd_', 'id_order', [{ attr: 'id_order', oper: '=', val: this.id_order }])).length !== 0) {
      if (this.id_order !== undefined && await db.delete('_ListProd_', [{ attr: 'id_order', oper: '=', val: this.id_order }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = ListProdMdl;
