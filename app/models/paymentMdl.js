const db = require('../db');
/**
 * @classdesc Class model of payment.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class PaymentMdl {
  constructor(
    {
      id,
      id_user,
      account,
      token,
      status,
      date,
      updated,
    }
  ) {
    this.id = id;
    this.id_user = id_user;
    this.account = account;
    this.token = token;
    this.token = token;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new PaymentMdl(res));
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

  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Payment_',
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
      if (await db.create('_Payment_', this)) {
        const id = await db.select(
          '_Payment_',
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
        '_Payment_',
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
      if (exists.length) {
        if (await db.delete(
          '_Payment_',
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

module.exports = PaymentMdl;
