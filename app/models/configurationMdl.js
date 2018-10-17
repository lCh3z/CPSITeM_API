const db = require('../db');
/**
 * @classdesc Class model of configuration.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class ConfigurationMdl{
  constructor(args){
    this.id = args.id;
    this.label = args.label;
    this.value = args.value;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ConfigurationMdl(res));
    });
    return result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Configuration_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Configuration_', this)) return 0;
    return 1;
  }

  async update() {
    if (this.id !== undefined && await db.update('_Configuration_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Configuration_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Configuration_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = ConfigurationMdl;
