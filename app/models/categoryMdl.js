const db = require('../db');
/**
 * @classdesc Class model of category.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class CategoryMdl{
  constructor(
    {
      id,
      name,
      description,
      photo,
      status,
      date,
      updated,
    }
  ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.date = date;
    this.status = status;
  }

  /**
   * @async
   * Async function that from the table _Category_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_Category_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _Cart_ from the database
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
        response.push(new CategoryMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

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
   * Async funciton that checks if a cart already exists in the
   *  table _Category_ of the Database
   * @return {Promise} Return a promise with the information from the database.
   * @version 15/10/2018
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Category_',
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

  async save() {
    try {
      const exists = await this.exists();
      if (this.id !== undefined && exists.length) {
        return this.update();
      }
      if (await db.create('_Category_', this)) {
        const id = await db.select(
          '_Category_',
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
        '_Category_',
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
          '_Category_',
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

module.exports = CategoryMdl;
