const db = require('../db');

class CategoryMdl{
  constructor(args){
    this.id = args.id;
    this.name = args.name;
    this.description = args.description;
    this.photo = args.photo;
    this.date = args.date;
    this.status = args.status;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new CategoryMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Category_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Category_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Category_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Category_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Category_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = CategoryMdl;
