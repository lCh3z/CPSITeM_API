const db = require('../db');

class WorkerMdl {
  constructor(
    {
      id_user,
      position,
      depart,
      status,
      date,
      updated,
    },
  ) {
    this.id_user =  id_user;
    this.position = position;
    this.depart = depart;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new WorkerMdl(res));
    });
    return result;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new WorkerMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async exists() {
    try {
      if (this.id_user !== undefined) {
        const result = await db.select(
          '_Worker_',
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
      if (exists.length) return this.update();
      if (await db.create('_Worker_', this)) return true;
      return false;
    } catch (e) {
      throw e;
    }
  }

  async update() {
    try {
      if (this.id_user !== undefined && await db.update(
        '_Worker_',
        this,
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
      )) return true;
      return false;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      const exists = this.exists();
      if (exists.length) {
        if (db.delete(
          '_Worker_',
          exists[0],
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
        )) return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = WorkerMdl;
