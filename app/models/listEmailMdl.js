const db = require('../db');

class ListEmailMdl {
  constructor(
    {
      id_user,
      email,
      number,
      status,
      date,
      updated,
    },
  ) {
    this.id_user = id_user;
    this.email = email;
    this.number = number;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new ListEmailMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async max(table, column, filters) {
    try {
      const data = await db.max(table, column, filters);
      return data[0].max;
    } catch (e) {
      throw e;
    }
  }

  async exists() {
    try {
      if (this.id_user !== undefined) {
        const result = await db.select(
          '_ListEmail_',
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
              attr: 'email',
              oper: '=',
              val: this.email,
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
      if (this.id_user !== undefined && exists.length !== 0) {
        delete this.email;
        return this.update();
      }
      if (await db.create('_ListEmail_', this)) {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async update() {
    try {
      if (this.id_user !== undefined && await db.update(
        '_ListEmail_',
        this,
        [
          {
            attr: 'id_user',
            oper: '=',
            val: this.id_user,
          },
          {
            logic: 'and',
            attr: 'number',
            oper: '=',
            val: this.number,
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

  async delete() {
    try {
      if(await db.delete(this)){
        return true
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      const exists = await this.exists();
      if (exists.length){
        if( db.update(
          '_ListEmail_',
          this,
          [
            {
              attr: 'id_user',
              oper: '=',
              val: this.id_user,
            },
            {
              logic: 'and',
              attr: 'number',
              oper: '=',
              val: this.number,
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

  async delete() {
    try {
      if(await db.delete(this)){
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ListEmailMdl;
