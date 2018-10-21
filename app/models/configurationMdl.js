const db = require('../db');

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
