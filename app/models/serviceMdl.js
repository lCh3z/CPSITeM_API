const db = require('../db');
/**
 * @classdesc Class model of service.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class ServiceMdl {
  constructor(
    {
      id,
      id_seller,
      id_user,
      hospital,
      title,
      type,
      equipment,
      model,
      serial,
      location,
      contract,
      description,
      voucher,
      status,
      date,
      updated,
    }
  ) {
    this.id = id;
    this.id_seller = id_seller;
    this.id_user = id_user;
    this.hospital = hospital;
    this.type = type;
    this.title = title;
    this.equipment = equipment;
    this.model = model;
    this.serial = serial;
    this.location = location;
    this.contract = contract;
    this.description = description;
    this.voucher = voucher;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  /**
   * @async
   * Async function that from the table _Service_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_Service_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _Service_ from the database
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
        const Service = new ServiceMdl(data[res])
        const statService = await Service.getImgStatServ(await Service.getStatServ());
        if (statService.length) {
          Service.stat_service = statService;
        }
        response.push(Service);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }
  /**
   * @async
   * Async function that reciebes two parameters.
   * The first one is the table (_Service_) to look for in the Database
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
   * Async funciton that checks if a service already exists in the
   * table _Service_ of the Database
   * @return {Promise} Return a promise with the information from the database.
   * @version 15/10/2018
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Service_',
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

  async save(stat_service) {
    const exists = await this.exists();
    if (this.id !== undefined && exists.length) {
      return this.update();
    }
    try {
      if (await db.create('_Service_', this)) {
        const id = await db.select(
          '_Service_',
          [
            'id',
          ],
          [
            {
              attr: 'title',
              oper: '=',
              val: this.title,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
        this.id = id[0].id;
        await this.saveStatServ(stat_service);
        return this.id;
      }
    } catch (e) {
      throw e;
    }
  }

  async update(stat_service) {
    try {
      if (this.id !== undefined && await db.update(
        '_Service_',
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
        await this.saveStatServ(stat_service);
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
          '_Service_',
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

  async getStatServ() {
    let stat_service = []
    try {
      stat_service = await db.select(
        '_StatService_',
        [
          '*',
        ],
        [
          {
            attr: 'id_service',
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
    return stat_service;
  }

  async getImgStatServ(data) {
    let img_stat_service = [];
    for (const stat of data) {
      try {
        img_stat_service = await db.select(
          '_ImgStatServ_',
          [
            '*',
          ],
          [
            {
              attr: 'id_stat_serv',
              oper: '=',
              val: stat.id,
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
      if (img_stat_service.length) {
        if (stat.imgs) {
          stat.imgs.push(img_stat_service);
        } else {
          stat.imgs = [img_stat_service];
        }
      }
    }

    return data;
  }

  async saveImgStatServ(new_list_stat_service) {
    let stat_service = [];
    try {
      stat_service = await db.select(
        '_StatService_',
        [
          '*',
        ],
        [
          {
            attr: 'id_service',
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
    for (const n_stat_service in new_list_stat_service) {
      for (const status in stat_service) {
        if (new_list_stat_service[n_stat_service] && stat_service[status] && new_list_stat_service[n_stat_service].title === stat_service[status].title) {
          new_list_stat_service[n_stat_service].id_stat_serv = stat_service[status].id
          const new_list_imgs = new_list_stat_service[n_stat_service].imgs;
          let old_list_imgs = [];
          try {
            old_list_imgs = await db.select(
              '_ImgStatServ_',
              [
                '*',
              ],
              [
                {
                  attr: 'id_stat_serv',
                  oper: '=',
                  val: stat_service[status].id,
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
            new_list_imgs[n_img].id_stat_serv = stat_service[status].id;
            for (const o_img in old_list_imgs) {
              if (new_list_imgs[n_img] && old_list_imgs[o_img] && new_list_imgs[n_img].photo === old_list_imgs[o_img].photo) {
                try {
                  await db.update(
                    '_ImgStatServ_',
                    new_list_imgs[n_img],
                    [
                      {
                        attr: 'id_stat_serv',
                        oper: '=',
                        val: stat_service[status].id,
                      },
                      {
                        logic: 'and',
                        attr: 'photo',
                        oper: '=',
                        val: new_list_imgs[n_img].photo,
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
                delete new_list_imgs[n_img];
                delete old_list_imgs[o_img];
              }
            }
          }
          for (const n_img in new_list_imgs) {
            await db.create(
              '_ImgStatServ_',
              new_list_imgs[n_img],
            );
          }

          for (const o_img in old_list_imgs) {
            await db.delete(
              '_ImgStatServ_',
              {},
              [
                {
                  attr: 'id_stat_serv',
                  oper: '=',
                  val: stat_service[status].id
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
          }
        }
      }
    }
  }

  async saveStatServ(new_list_stat_service) {
    let old_list_stat_service = [];
    try {
      old_list_stat_service = await db.select(
        '_StatService_',
        [
          '*',
        ],
        [
          {
            attr: 'id_service',
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
    let temp_list = new_list_stat_service.slice();
    for (const n_stat_service in new_list_stat_service) {
      new_list_stat_service[n_stat_service].id_service = this.id;
      const tmpIdServ = new_list_stat_service[n_stat_service].id_service;
      const tmpImgs = new_list_stat_service[n_stat_service].imgs.slice();
      delete new_list_stat_service[n_stat_service].imgs;
      delete new_list_stat_service[n_stat_service].id;
      for(const o_stat_service in new_list_stat_service) {
        if (new_list_stat_service[n_stat_service] && old_list_stat_service[o_stat_service] && new_list_stat_service[n_stat_service].title === old_list_stat_service[o_stat_service].title) {
          delete new_list_stat_service[n_stat_service].id_service;
          try {
            await db.update(
              '_StatService_',
              new_list_stat_service[n_stat_service],
              [
                {
                  attr: 'id_service',
                  oper: '=',
                  val: tmpIdServ,
                },
                {
                  logic: 'and',
                  attr: 'title',
                  oper: '=',
                  val: new_list_stat_service[n_stat_service].title,
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
          delete new_list_stat_service[n_stat_service];
          delete old_list_stat_service[o_stat_service];
        }
      }
      temp_list[n_stat_service].imgs = tmpImgs;
    }

    for(const n_stat_service in new_list_stat_service) {
      const tmpImgs = new_list_stat_service[n_stat_service].imgs.slice();
      delete new_list_stat_service[n_stat_service].imgs;
      try {
        await db.create(
          '_StatService_',
          new_list_stat_service[n_stat_service],
        );
      } catch (e) {
        throw e;
      }
      temp_list[n_stat_service].imgs = tmpImgs;
    }

    for(const o_stat_service in old_list_stat_service) {
      try {
        await db.delete(
          '_StatService_',
          {},
          [
            {
              attr: 'id_service',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'id',
              oper: '=',
              val: old_list_stat_service[o_stat_service].id,
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

    await this.saveImgStatServ(temp_list);
  }
}

  module.exports = ServiceMdl;
