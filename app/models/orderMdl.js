const db = require('../db');

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
    this.id =  id;
    this.id_user  = id_user ;
    this.id_address = id_address;
    this.id_payment = id_payment;
    this.id_cuppon = id_cuppon;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      for (const res in data) {
        const Order = new OrderMdl(data[res]);
        response.push(Order);
      }
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
    const exists = await this.exists();
    if (this.id !== undefined && exists.length) {
      return this.update();
    }
    try {
      if (await db.create('_Order_', this)) {
        const id = await db.select(
          '_Order_',
          [
            'id',
          ],
          [
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
        this.id = id[id.length-1].id;
        console.log('ID: ', this.id);
        return id[0].id;
      }
    } catch (e) {
      throw e;
    }
  }

  async update(list_prod) {
    try {
      const id = await db.select(
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
        null,
        null,
      );
      console.log('id', id[0].id);
      if (id[0].id === this.id) {
        delete this.id;
      }
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
}

module.exports = OrderMdl;
