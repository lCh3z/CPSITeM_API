const db = require('../db');
/**
 * @classdesc Class model of cuppon.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class CupponMdl {
  constructor(
    {
      id,
      code,
      discount,
      start,
      end,
      description,
      status,
      date,
      updated,
    }
  ){
    this.id = id;
    this.code = code;
    this.discount = discount;
    this.start = start;
    this.end = end;
    this.description = description;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  /**
   * @async
   * Async function that from the table _Cuppon_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_Cuppon_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _Cuppon_ from the database
   * @param  {Array.<object>}  filters list of filter objects to use.
   * @param  {Object}  order   Nullable definition of ORDER paramns.
   * @param  {Object}  limit   Nullable definition of LIMIT params.
   * @return {Promise}         Return a promise with the information from the database.
   */
  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new CupponMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }
  /**
   * @async
   * Async function that reciebes two parameters.
   * The first one is the table (_Cuppon_) to look for in the Database
   * The second parameter are the filters to aply to the search
   * It will return a promise with the total count
   * @param  {string}  table   Table to look for in the database
   * @param  {Array.<object>}  filters filters to be applied to the search
   * @return {Promise}         Returns a promise with the total count of tuples
   *                           found
   * @version 15/10/2018
   */
  static async count(table, filters) {
    try {
      const data = await db.count(table, filters);
      return data[0].count;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @async
   * Async funciton that checks if a cuppon already exists in the
   *  table _Cuppon_ of the Database
   * @return {Promise} Return a promise with the information from the database.
   * @version 15/10/2018
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Cuppon_',
          [
            'id',
          ],
          [
            {
              attr: 'id',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
        return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }

  /**
   * @async
   * Async funciton that checks if a cuppon already exists, it will be updated, if not
   * it will be created in the table _Cuppon_ in the database
   *
   * @return {Promise} Returns a promise,
   *                    - updated if it already exists
   *                    - true if it is created a new one
   *                    - false if it could not be created
   * @version 15/10/2018
   */
  async save() {
    try {
      const exists = await this.exists();
      if (this.id !== undefined && exists.length) {
        return this.update();
      }
      if (await db.create('_Cuppon_', this)) {
        const id = await db.select(
          '_Cuppon_',
          [
            'id',
          ],
        );
        return id[0].id;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
  async update() {
    try {
      if (this.id !== undefined && await db.update(
        '_Cuppon_',
        this,
        [
          {
            attr: 'id',
            oper: '=',
            val: this.id,
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
      )) return this.id;
      return false;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      const exists = await this.exists();
      console.log('EXI', exists);
      if (exists.length) {
        if (await db.delete(
          '_Cuppon_',
          exists[0],
          [
            {
              attr: 'id',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        )) return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

}

module.exports = CupponMdl;
