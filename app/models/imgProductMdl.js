const db = require('../db');

class ImgProductMdl{
  constructor(
    {
      id_prod,
      photo,
      status,
      date,
      updated,
    },
  ){
    this.id_prod = id_prod;
    this.photo = photo;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ImgProductMdl(res));
    });
    return result;
  }
  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      data.forEach((res) => {
        response.push(new ImgProductMdl(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async exists() {
    try {
      if (this.id_prod !== undefined) {
        const result = await db.select(
          '_ImgProduct_',
          [
            'id_prod',
          ],
          [
            {
              attr: 'id_prod',
              oper: '=',
              val: this.id_prod,
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
      if (await db.create('_ImgProduct_', this)) return true;
      return false;
    } catch (e) {
      throw e;
    }
  }

  async update() {
    try {
      if (this.id_prod !== undefined && await db.update(
        '_ImgProduct_',
        this,
        [
          {
            attr: 'id_prod',
            oper: '=',
            val: this.id_prod,
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
          '_ImgProduct_',
          exists[0],
          [
            {
              attr: 'id_prod',
              oper: '=',
              val: this.id_prod,
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

module.exports = ImgProductMdl;
