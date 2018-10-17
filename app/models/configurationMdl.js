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

  /**
   * Function that reciebes one param.
   * it will be iterated on a foEach to create new objects type ConfigurationMdl
   * and will be pushed to a new constant variable that will ber returned.
   * @param  {Array.<object>} data Array object that contains all the information
   *                                to create a new configuration Model
   * @return {Array.<object>}      returns an array of objects type ConfigurationMdl
   *
   * @version 15/10/2018
   */
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ConfigurationMdl(res));
    });
    return result;
  }

  /**
   * @async
   *Async funcitonthat checks if a configuration already exists, it will be updated, if not
   * it will be created in the table _Configuration_ in the database
   *
   * @return {Promise} Returns a promise,
   *                    - updated if it already exists
   *                    - true if it is created a new one
   *                    - false if it could not be created
   * @version 15/10/2018
   */
  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.id !== undefined && this.processResult(await db.get('_Configuration_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('_Configuration_', this)) return 0;
    return 1;
  }

  /**
   * @async
   * Async funciton that updates a configuration from the table _Configuration_ in the Database
   * @return {Promise} Returns a Promise
   *                   - Returns true if it could be updated
   *                   - Returns false if it could not be updated
   * @version 15/10/2018
   */
  async update() {
    if (this.id !== undefined && await db.update('_Configuration_', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }

  /**
   * @async
   * Async function that deletes a configuration from the table _Configuration_ in the database .
   * It will check first if the tuple to delete exists
   *
   * @return {Promise} Returns a Promise
   *                   - Return true if it could be deleted
   * @version 15/10/2018
   */
  async delete() {
    if (this.id !== undefined && this.processResult(await db.get('_Configuration_', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('_Configuration_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
  }
}

module.exports = ConfigurationMdl;
