const db = require('../db');
/**
 * @classdesc Class model of section.contains methods such as select, save, exists
 * save, update, delete and processResult
 * @version 15/10/2018
 */
class SectionMdl {
  constructor(
    {
      id,
      title,
      type,
      status,
      date,
      updated,
    }
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  /**
   * @async
   * Async function that from the table _Section_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_Section_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _Section_ from the database
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
        const Section = new SectionMdl(data[res])
        Section.conf_section = await Section.getConfSection();
        response.push(Section);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @async
   * Async function that reciebes two parameters.
   * The first one is the table (_Section_) to look for in the Database
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
   * Async funciton that checks if a category already exists in the
   * table _Section_ of the Database
   * @return {Promise} Return a promise with the information from the database.
   * @version 15/10/2018
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Section_',
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

  async save(conf_section) {
    const exists = await this.exists();
    if (this.id !== undefined && exists.length) {
      return this.update();
    }
    try {
      if (await db.create('_Section_', this)) {
        const id = await db.select(
          '_Section_',
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
        await this.saveConfSection(conf_section);
        return this.id;
      }
    } catch (e) {
      throw e;
    }
  }

  async update(conf_section) {
    try {
      if (this.id !== undefined && await db.update(
        '_Section_',
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
        await this.saveConfSection(conf_section);
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
          '_Section_',
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

  async getConfSection() {
    let conf_section = []
    try {
      conf_section = await db.select(
        '_ConfSection_',
        [
          '*',
        ],
        [
          {
            attr: 'id_section',
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
    return conf_section;
  }

  async saveConfSection(new_conf_section) {
    let old_conf_section = [];
    try {
      old_conf_section = await db.select(
        '_ConfSection_',
        [
          '*',
        ],
        [
          {
            attr: 'id_section',
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

    for (const n_section in new_conf_section) {
      new_conf_section[n_section].id_section = this.id;
      for(const o_section in old_conf_section) {
        if (new_conf_section[n_section] && old_conf_section[o_section] && new_conf_section[n_section].title === old_conf_section[o_section].title) {
          try {
            await db.update(
              '_ConfSection_',
              new_conf_section[n_section],
              [
                {
                  attr: 'id_section',
                  oper: '=',
                  val: this.id,
                },
                {
                  logic: 'and',
                  attr: 'title',
                  oper: '=',
                  val: old_conf_section[o_section].title,
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
          delete new_conf_section[n_section];
          delete old_conf_section[o_section];
        }
      }
    }
    for(const n_section in new_conf_section) {
      try {
        await db.create(
          '_ConfSection_',
          new_conf_section[n_section],
        );
      } catch (e) {
        throw e;
      }
    }
    for(const o_section in old_conf_section) {
      try {
        await db.delete(
          '_ConfSection_',
          {},
          [
            {
              attr: 'id_section',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'title',
              oper: '=',
              val: old_conf_section[o_section].title,
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

module.exports = SectionMdl;
