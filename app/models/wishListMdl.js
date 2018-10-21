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

    /**
     * Function that reciebes one param.
     * it will be iterated on a foEach to create new objects type wishlistMdl
     * and will be pushed to a new constant variable that will ber returned.
     * @param  {Array.<object>} data Array object that contains all the information
     *                                to create a new wishlist Model
     * @return {Array.<object>}      returns an array of objects type wishlistMdl
     *
     * @version 15/10/2018
     */
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new WishlistMdl(res));
    });
    return result;
  }

  /**
   * @async
   * Async function that from the table _WishList_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_WishList_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _WishList_
   *                                   from the database
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
        response.push(new WishlistMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @async
   * Async funciton that checks if a wishlist already exists in the
   *  table _WishList_ of the Database
   * @return {Promise} Return a promise with the information from the database.
   * @version 15/10/2018
   */
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

  /**
   * @async
   *Async funcitonthat checks if a wishlist already exists, it will be updated, if not
   * it will be created in the table _WishList_ in the database
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

  /**
   * @async
   * Async function that deletes a wishlist from the table _WishList_ in the database .
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
