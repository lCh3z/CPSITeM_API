const db = require('../db');
/**
 * @classdesc Class model of product.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class ProductMdl {
  constructor(
    {
      id,
      id_cat,
      name,
      price,
      discount,
      inventory,
      description,
      specs,
      min_quan,
      status,
      date,
      updated
    }
  ) {
    this.id = id;
    this.id_cat = id_cat;
    this.name = name;
    this.price = price;
    this.status = status;
    this.discount = discount;
    this.inventory = inventory;
    this.description = description;
    this.specs = specs;
    this.min_quan = min_quan;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  /**
   * @async
   * Async function that from the table _Product_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_Product_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _Product_ from the database
   * @param  {Array.<object>}  filters list of filter objects to use.
   * @param  {Object}  order   Nullable definition of ORDER paramns.
   * @param  {Object}  limit   Nullable definition of LIMIT params.
   * @return {Promise}         Return a promise with the information from the database.
   */
  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      for (const res in data) {
        const Product = new ProductMdl(data[res])
        Product.list_imgs = await Product.getImgProduct();
        response.push(Product);
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
          '_Product_',
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

  async save(list_imgs) {
    try {
      const exists = await this.exists();
      if (this.id !== undefined && exists.length) {
        return this.update();
      }
      if (await db.create('_Product_', this)) {
        const id = await db.select(
          '_Product_',
          [
            'id',
          ],
          [
            {
              attr: 'name',
              oper: '=',
              val: this.name,
            },
          ],
        );

        console.log('id', id);
        this.id = id[0].id;
        await this.saveImgProduct(list_imgs);
        return id[0].id;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async update(list_imgs) {
    try {
      const old_name = await db.select(
        '_Product_',
        [
          'name',
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
      console.log('name', old_name[0].name);
      if (old_name[0].name === this.name) {
        delete this.name;
      }
      if (this.id !== undefined && await db.update(
        '_Product_',
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
        await this.saveImgProduct(list_imgs);
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
          '_Product_',
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

  async getImgProduct() {
    let list_imgs = []
    try {
      list_imgs = await db.select(
        '_ImgProduct_',
        [
          '*',
        ],
        [
          {
            attr: 'id_prod',
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
    return list_imgs;
  }

  async saveImgProduct(new_list_imgs) {
    let old_list_imgs = [];
    try {
      old_list_imgs = await db.select(
        '_ImgProduct_',
        [
          '*',
        ],
        [
          {
            attr: 'id_prod',
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

    for (const n_img in new_list_imgs) {
      new_list_imgs[n_img].id_prod = this.id;
      for(const o_img in old_list_imgs) {
        if (new_list_imgs[n_img] && old_list_imgs[o_img] && new_list_imgs[n_img].photo === old_list_imgs[o_img].photo) {
          await db.update(
            '_ImgProduct_',
            new_list_imgs[n_img],
            [
              {
                attr: 'id_prod',
                oper: '=',
                val: this.id,
              },
              {
                logic: 'and',
                attr: 'photo',
                oper: '=',
                val: old_list_imgs[o_img].photo,
              },
              {
                logic: 'and',
                attr: 'status',
                oper: '!=',
                val: 0,
              },
            ],
          );
          delete new_list_imgs[n_img];
          delete old_list_imgs[o_img];
        }
      }
    }

    for(const n_img in new_list_imgs) {
      try {
        await db.create(
          '_ImgProduct_',
          new_list_imgs[n_img],
        );
      } catch (e) {
        throw e;
      }
    }
    for(const o_img in old_list_imgs) {
      try {
        await db.delete(
          '_ImgProduct_',
          {},
          [
            {
              attr: 'id_prod',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'photo',
              oper: '=',
              val: old_list_imgs[o_img].photo,
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

module.exports = ProductMdl;
