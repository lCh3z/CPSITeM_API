const db = require('../db');

class AddressMdl{
constructor(args){
  this.id = args.id;
  this.id_client = args.id_client;
  this.name = args.name;
  this.street = args.street;
  this.colony = args.colony;
  this.city = args.city;
  this.business_name = args.business_name;
  this.state = args.state;
  this.date = args.date;
  this.out_num = args.out_num;
  this.int_num = args.int_num;
  this.zip_code = args.zip_code;
  this.phone = agrs.phone;
  this.email = args.email;
}

processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new AddressMdl(res));
  });
  return result;
}

async save() {
  Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
  if (this.id !== undefined && this.processResult(await db.get('_Address_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
  if (await db.create('_Address_', this)) return 0;
  return 1;
}

async update() {
  if (this.id !== undefined && await db.update('_Address_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
  return 1;
}

async delete() {
  if (this.id !== undefined && this.processResult(await db.get('_Address_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
    if (this.id !== undefined && await db.delete('_Address_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
    return 1;
  }
  return 2;
}

}

module.exports = AddressMdl;
