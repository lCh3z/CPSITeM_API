const db = require('../db');

class SectionMdl{
  constructor(args){
    this.id = args.id;
    this.type = args.type;
    this.status = args.status;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new SectionMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Section_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Section_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Section_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Section_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Section_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = SectionMdl;
