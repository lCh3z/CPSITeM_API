const db = require('../db');

// FIXME Todos los metodos deben estar documentados

class NewsListMdl{
  constructor(args){
    this.email = args.email;
    this.status = args.status;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new NewsListMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.email !== undefined && this.processResult(await db.get('_NewsList_', 'email', [{ attr: 'email', oper: '=', val: this.email }])).length !== 0) return this.update();
    if (await db.create('_NewsList_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.email !== undefined && await db.update('_NewsList_', this, [{ attr: 'email', oper: '=', val: this.email }])) return 0;
    return 1;
  }

  async delete() {
    if (this.email !== undefined && this.processResult(await db.get('_NewsList_', 'email', [{ attr: 'email', oper: '=', val: this.email }])).length !== 0) {
      if (this.email !== undefined && await db.delete('_NewsList_', [{ attr: 'email', oper: '=', val: this.email }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }

}

module.exports = NewsListMdl;
