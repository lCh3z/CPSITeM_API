const db = require('../db');
/**
 * @classdesc Class model of notification.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class NotificationMdl {
  constructor(
    {
      id,
      title,
      cont,
      id_user,
      prog,
      status,
      date,
      updated,
    }
  ){
    this.id = id;
    this.title = title;
    this.cont = cont;
    this.id_user = id_user;
    this.date = date;
    this.prog = prog;
    this.status = status;
  }

  /**
   * @async
   * Async function that from the table _Notification_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_Notification_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _Notification_ from the database
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
        response.push(new NotificationMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @async
   * Async function that reciebes two parameters.
   * The first one is the table (_Notification_) to look for in the Database
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

  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Notification_',
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
      if (await db.create('_Notification_', this)) {
        const id = await db.select(
          '_Notification_',
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
        '_Notification_',
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
          '_Notification_',
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

module.exports = NotificationMdl;
