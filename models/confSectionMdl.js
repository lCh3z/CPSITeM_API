const db = require('../db');

class ConfSectionMsl{
  constructor(args){
    this.id_section = args.id_section;
    this.photo = args.photo;
    this.title = args.title;
    this.subtitle = args.subtitle;
    this.type = args.type;
    this.description = args.description;
}
processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new ConfSectionMsl(res));
  });
  return result;
}

async save() {
  Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
  if (this.id_section !== undefined && this.processResult(await db.get('_ConfSection_', 'id_section', [{ attr: 'id_section', oper: '=', val: this.id_section }])).length !== 0) return this.update();
  if (await db.create('_ConfSection_', this)) return 0;
  return 1;
}

async update() {
  if (this.id_section !== undefined && await db.update('_ConfSection_', this, [{ attr: 'id_section', oper: '=', val: this.id_section }])) return 0;
  return 1;
}

async delete() {
  if (this.id_section !== undefined && this.processResult(await db.get('_ConfSection_', 'id_section', [{ attr: 'id_user', oper: '=', val: this.id_section }])).length !== 0) {
    if (this.id_section !== undefined && await db.delete('_ConfSection_', [{ attr: 'id_section', oper: '=', val: this.id_section }]) !== undefined) return 0;
    return 1;
  }
  return 2;
}
}

module.exports = ConfSectionMsl;
