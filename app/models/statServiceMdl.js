const db = require('../db');

class StatServiceMdl {
  constructor(args){
    this.id = args.id;
    this.id_service = args.id_service;
    this.title = args.title;
    this.date = args.date;
    this.description = args.description;
    this.materials = args.materials;
    this.observations = args.observations;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new StatServiceMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_StatService_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_StatService_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_StatService_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_StatService_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_StatService_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }

}

module.exports = StatServiceMdl;
