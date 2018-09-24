const db = require('../db');

class ServiceMdl {
  constructor(args) {
    this.id =  args.id;
    this.id_seller = args.id_seller;
    this.id_user = args.id_user;
    this.hospital = args.hospital;
    this.status = args.status;
    this.date = args.date;
    this.type = args.type;
    this.equipment = args.equipment ;
    this.model = args.model;
    this.serial_ = args.serial_;
    this.location = args.location;
    this.contract = args.contract;
    this.description = args.description;
    this.voucher = args.voucher;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ServiceMdl(res));
    });
    return result;
  }
  
  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Service_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Service_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Service_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Service_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Service_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = ServiceMdl;
