const db = require('../db');

class ImgProductMdl{
  constructor(args){
    this.id_prod = args.id_prod;
    this.photo = args.photo;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ImgProductMdl(res));
    });
    return result;
  }
  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id_prod !== undefined && this.processResult(await db.get('_ImgProduct_', 'id_user', [{ attr: 'id_prod', oper: '=', val: this.id_prod }])).length !== 0) return this.update();
    if (await db.create('_ImgProduct_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id_prod !== undefined && await db.update('_ImgProduct_', this, [{ attr: 'id_prod', oper: '=', val: this.id_prod }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id_prod !== undefined && this.processResult(await db.get('_ImgProduct_', 'id_prod', [{ attr: 'id_prod', oper: '=', val: this.id_prod }])).length !== 0) {
      if (this.id_prod !== undefined && await db.delete('_ImgProduct_', [{ attr: 'id_prod', oper: '=', val: this.id_prod }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = ImgProductMdl;
