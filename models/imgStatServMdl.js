const db = require('../db');

class ImgStatServMdl{
  constructor(args){
    this.id_stat_serv = args.id_stat_serv;
    this.photo = args.photo;
  }
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ImgStatServMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id_stat_serv !== undefined && this.processResult(await db.get('_ImgStatServ_', 'id_stat_serv', [{ attr: 'id_stat_serv', oper: '=', val: this.id_stat_serv }])).length !== 0) return this.update();
    if (await db.create('_ImgStatServ_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id_stat_serv !== undefined && await db.update('_ImgStatServ_', this, [{ attr: 'id_stat_serv', oper: '=', val: this.id_stat_serv }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id_stat_serv !== undefined && this.processResult(await db.get('_ImgStatServ_', 'id_stat_serv', [{ attr: 'id_stat_serv', oper: '=', val: this.id_stat_serv }])).length !== 0) {
      if (this.id_stat_serv !== undefined && await db.delete('_ImgStatServ_', [{ attr: 'id_stat_serv', oper: '=', val: this.id_stat_serv }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = ImgStatServMdl;
