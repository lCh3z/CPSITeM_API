const db = require('../db');
/**
 * @classdesc Class model of newsList.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class NewsListMdl{
  constructor(args){
    this.email = args.email;
    this.status = args.status;
  }

  /**
   * Function that reciebes one param.
   * it will be iterated on a foEach to create new objects type newsListMdl
   * and will be pushed to a new constant variable that will ber returned.
   * @param  {Array.<object>} data Array object that contains all the information
   *                                to create a new newsList Model
   * @return {Array.<object>}      returns an array of objects type newsListMdl
   *
   * @version 15/10/2018
   */
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new NewsListMdl(res));
    });
    return result;
  }

  /**
   * @async
   * Async funcitonthat checks if a newsList already exists, it will be updated, if not
   * it will be created in the table _NewsList_ in the database
   *
   * @return {Promise} Returns a promise,
   *                    - updated if it already exists
   *                    - true if it is created a new one
   *                    - false if it could not be created
   * @version 15/10/2018
   */
  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.email !== undefined && this.processResult(await db.get('_NewsList_', 'email', [{ attr: 'email', oper: '=', val: this.email }])).length !== 0) return this.update();
    if (await db.create('_NewsList_', this)) return 0;
    return 1;
  }

  /**
   * @async
   * Async funciton that updates a newsList from the table _NewsList_ in the Database
   * @return {Promise} Returns a Promise
   *                   - Returns true if it could be updated
   *                   - Returns false if it could not be updated
   * @version 15/10/2018
   */
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
