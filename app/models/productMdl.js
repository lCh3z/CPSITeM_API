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

  /**
   * @async
   * Async function that reciebes two parameters.
   * The first one is the table (_Product_) to look for in the Database
   * The second parameter are the filters to aply to the search
   * It will return a promise with the total count
   * @param  {string}  table   Table to look for in the database
   * @param  {Array.<object>}  filters filters to be applied to the search
   * @return {Promise}         Returns a promise with the total count of tuples
   *                           found
   * @version 15/10/2018
   */
  static async count(table, filters) {
    try {
      const data = await db.count(table, filters);
      return data[0].count;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @async
   * Async funciton that checks if a product already exists in the
   * table _Product_ of the Database
   * @return {Promise} Return a promise with the information from the database.
   * @version 15/10/2018
   */
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

  /**
   * @async
   * Async funcitonthat checks if a product already exists, it will be updated, if not
   * it will be created in the table _Product_ in the database
   *
   * @return {Promise} Returns a promise,
   *                    - updated if it already exists
   *                    - true if it is created a new one
   *                    - false if it could not be created
   * @version 15/10/2018
   */
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

  /**
   * @async
   * Async function that updates a cart from the table _Product_ in the Database
   * @return {Promise} Returns a Promise
   *                   - Returns true if it could be updated
   *                   - Returns false if it could not be updated
   * @version 15/10/2018
   */
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

  /**
   * @async
   * Async function that deletes a cart from the table _Product_ in the database .
   * It will check first if the tuple to delete exists
   *
   * @return {Promise} Returns a Promise
   *                   - Return true if it could be deleted
   * @version 15/10/2018
   */
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

  /**
   * @async
   * Async function that gets an array of images from an specific product
   * @return {Promise} Return a Promise
   *                   - Returns an array with the list of images
   * @version 15/10/2018
   */
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

  /**
   * Async function that reciebes one param with the new array of images for
   * the product.
   * It will obtain the old list of images and then will be compared ith the new
   * one.
   * The old list of images will be deleted from the table _ImgProduct_ from
   * the database and will be substituted with the new one
   * @param  {[type]}  new_list_imgs [description]
   * @return {Promise}               [description]
   */
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
