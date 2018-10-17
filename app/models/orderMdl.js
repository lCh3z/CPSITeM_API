const db = require('../db');
/**
 * @classdesc Class model of order.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class OrderMdl {
  constructor(
    {
      id,
      id_user,
      id_address,
      id_payment,
      id_cuppon,
      status,
      date,
      updated,
    }
  ) {
    this.id = id;
    this.id_user = id_user;
    this.id_address = id_address;
    this.id_payment = id_payment;
    this.id_cuppon = id_cuppon;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  /**
   * @async
   * Async function that from the table _Order_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_Order_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _Order_ from the database
   * @param  {Array.<object>}  filters list of filter objects to use.
   * @param  {Object}  order   Nullable definition of ORDER paramns.
   * @param  {Object}  limit   Nullable definition of LIMIT params.
   * @return {Promise}         Return a promise with the information from the database.
   */
  static async select(table, columns, filters, order, limit) {
    const response = [];
    try {
      const data = await db.select(table, columns, filters, order, limit);
      for (const res of data) {
        const Order = new OrderMdl(res);
        Order.list_prod = await Order.getListProd();
        response.push(Order);
      }
    } catch (e) {
      throw e;
    }
    return response;
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
          '_Order_',
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

  async save(list_prod) {
    try {
      const exists = await this.exists();
      if (this.id !== undefined && exists.length) {
        return this.update();
      }
      if (await db.create('_Order_', this)) {
        const id = await db.max(
          '_Order_',
          'id',
          [
            {
              attr: 'id_user',
              oper: '=',
              val: this.id_user,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
        this.id = id[0].max;
        await this.saveListProd(list_prod);
        return this.id;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
  async update(list_prod) {
    try {
      if (this.id !== undefined && await db.update(
        '_Order_',
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
        await this.saveListProd(list_prod);
        return this.id;
      }
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
          '_Order_',
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

  async getListProd() {
    let list_prod = []
    try {
      list_prod = await db.select(
        '_ListProd_',
        [
          '*',
        ],
        [
          {
            attr: 'id_order',
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
        null,
        null,
      );
    } catch (e) {
      throw e;
    }
    return list_prod;
  }

  async saveListProd(new_list_prod) {
    let old_list_prod = [];
    try {
      old_list_prod = await db.select(
        '_ListProd_',
        [
          '*',
        ],
        [
          {
            attr: 'id_order',
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
        null,
        null,
      );
    } catch (e) {
      throw e;
    }

    for (const n_prod in new_list_prod) {
      new_list_prod[n_prod].id_order = this.id;
      for(const o_prod in old_list_prod) {
        if (new_list_prod[n_prod] && old_list_prod[o_prod] && new_list_prod[n_prod].email === old_list_prod[o_prod].email) {
          new_list_prod[n_prod].id_product = old_list_prod[o_prod].id_product;
          try {
            await db.update(
              '_ListProd_',
              new_list_prod[n_prod],
              [
                {
                  attr: 'id_order',
                  oper: '=',
                  val: this.id,
                },
                {
                  logic: 'and',
                  attr: 'id_product',
                  oper: '=',
                  val: new_list_prod[n_prod].id_product,
                },
                {
                  logic: 'and',
                  attr: 'status',
                  oper: '!=',
                  val: 0,
                },
              ],
            );
          } catch (e) {
            throw e;
          }
          delete new_list_prod[n_prod];
          delete old_list_prod[o_prod];
        }
      }
    }

    for(const n_prod in new_list_prod) {
      try {
        await db.create(
          '_ListProd_',
          new_list_prod[n_prod],
        );
      } catch (e) {
        throw e;
      }
    }

    for(const o_prod in old_list_prod) {
      try {
        await db.delete(
          '_ListProd_',
          {},
          [
            {
              attr: 'id_order',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'id_product',
              oper: '=',
              val: old_list_prod[o_prod].id_prod,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
      } catch (e) {
        throw e;
      }
    }
  }
}

module.exports = OrderMdl;
