const db = require('../db');
/**
 * @classdesc Class model of wishlist.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class WishlistMdl {
  constructor(
      {
        id_user,
        id_product,
        status,
        date,
        updated
      },
    ) {
      this.id_user = id_user;
      this.id_product = id_product;
      this.status = status;
      this.date = date;
      this.updated = updated;
    }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new WishlistMdl(res));
    });
    return result;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new WishlistMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async exists() {
    try {
      if (this.id_user !== undefined && this.id_product !== undefined) {
        const result = await db.select(
          '_WishList_',
          [
            'id_user',
          ],
          [
            {
              attr: 'id_user',
              oper: '=',
              val: this.id_user,
            },
            {
              logic: 'and',
              attr: 'id_product',
              oper: '=',
              val: this.id_product,
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
      if (this.id_user !== undefined && exists.length) {
        return true;
      }
      if (await db.create('_WishList_', this)) {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    const exists = await this.exists();
    if (exists.length) {
      try {
        if (await db.delete(
          '_WishList_',
          exists[0],
          [
            {
              attr: 'id_user',
              oper: '=',
              val: this.id_user,
            },
            {
              logic: 'and',
              attr: 'id_product',
              oper: '=',
              val: this.id_product,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        )) return true;
      } catch (e) {
        throw e;
      }
    }
    return false;
  }
}

module.exports = WishlistMdl;
