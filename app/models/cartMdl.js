const db = require('../db');

class CartMdl {
  constructor(
    {
      id_user,
      id_product,
      quantity,
      status,
      date,
      updated
    },
  ) {
    this.id_user = id_user;
    this.id_product = id_product;
    this.quantity = quantity;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new CartMdl(res));
    });
    return result;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new CartMdl(res));
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
          '_Cart_',
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
        return this.update();
      }
      if (await db.create('_Cart_', this)) {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async update() {
    try {
      if (this.id_user !== undefined && this.id_product !== undefined && await db.update(
        '_Cart_',
        this,
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
          '_Cart_',
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

module.exports = CartMdl;
