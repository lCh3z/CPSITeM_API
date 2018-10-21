const db = require('../db');

/**
 * @classdesc Class model of configuration.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class ConfigurationMdl {
  constructor({
    id,
    label,
    value,
    status,
    date,
    updated,
  }) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  static async select(table, columns, filters, order, limit) {
    let data = [];
    try {
      data = await db.select(table, columns, filters, order, limit);
    } catch (e) {
      throw e;
    }
    const response = [];
    for (const res of data) {
      response.push(await new ConfigurationMdl(res));
    }
    return response;
  }

  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Configuration_',
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
    } catch (e) {
      throw e;
    }
    return [];
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
    const exists = await this.exists();
    if (this.id && exists.length) {
      return this.update();
    } else if (!this.id) {
      try {
        const result = await db.create(
          '_Configuration_',
          this,
        );
        if (result) {
          this.id = result.insertId;
          return this.id;
        }
      } catch (e) {
        throw e;
      }
    }
    return false;
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
    try {
      if (this.id !== undefined && await db.update(
        '_Configuration_',
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
      )) {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
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
    const exists = await this.exists();
    if (exists.length) {
      try {
        if (await db.delete(
          '_Configuration_',
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
        )) {
          return true;
        }
      } catch (e) {
        throw e;
      }
    }
    return false;
  }
}

module.exports = ConfigurationMdl;
