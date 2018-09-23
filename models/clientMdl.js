const db = require('../db');

class ClientMdl {
  constructor(args) {
    this.id = args.id;
    this.photo = args.photo;
    this.name = args.name;
    this.sec_name = args.sec_name;
    this.pat_surname = args.pat_surname;
    this.mat_surname = args.mat_surname;
    this.company = args.company;
    this.rfc = args.rfc;
    this.cfdi = args.cfdi;
    this.country = args.country;
    this.lada = args.lada;
    this.phone = args.phone;
    this.status = args.status;
    this.main_email = args.main_email;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ClientMdl(res));
    });
    return result;
  }

  async save() {
    // Object.keys(this).forEach(key => this[key] === undefined && key !== 'sec_name' && key !== 'photo' && key !== 'company' && delete this[key]);
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Client_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Client_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Client_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Client_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Client_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }

  getName() {
    let name = this.name === undefined ? '' : this.name;
    name += this.sec_name === undefined ? '' : ` ${this.sec_name}`;
    name += this.pat_surname === undefined ? '' : ` ${this.pat_surname}`;
    name += this.mat_surname === undefined ? '' : ` ${this.mat_surname}`;
    return name;
  }

  getPhone() {
    return `${country} (${lada}) ${phone.substr(0, 4)} ${phone.substr(4, 8)}`;
  }
}

module.exports = ClientMdl;
