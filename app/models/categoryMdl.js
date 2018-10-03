const db = require('../db');

class CategoryMdl{
  constructor(
    {
      id,
      name,
      description,
      photo,
      status,
      date,
      updated,
    }
  ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.date = date;
    this.status = status;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new CategoryMdl(res));
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
          '_Category_',
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
      if (await db.create('_Category_', this)) {
        const id = await db.select(
          '_Category_',
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
        '_Category_',
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
      console.log('EXI', exists);
      if (exists.length) {
        if (await db.delete(
          '_Category_',
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

module.exports = CategoryMdl;
