const bcrypt = require('bcrypt-nodejs');
const db = require('../db');

/**
 * @classdesc User class model. Contains methods such as select, save, exist
 * save, update, delete and role
* @version 16/10/2018
 */

class UserMdl {
  constructor(
    {
      id,
      photo,
      name,
      sec_name,
      pat_surname,
      mat_surname,
      company,
      rfc,
      cdu,
      cfdi,
      type,
      country,
      lada,
      phone,
      main_email,
      status,
      date,
      updated,
    },
  ) {
    this.id = id;
    this.photo = photo;
    this.name = name;
    this.sec_name = sec_name;
    this.pat_surname = pat_surname;
    this.mat_surname = mat_surname;
    this.company = company;
    this.rfc = rfc;
    this.cdu = cdu;
    this.cfdi = cfdi;
    this.type = type;
    this.country = country;
    this.lada = lada;
    this.phone = phone;
    this.main_email = main_email;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  generateHash(text) {
    return new Promise(async (resolve, reject) => {
      try {
        await bcrypt.genSalt(process.env.SALT_ROUND, async (err, salt) => {
          if (salt) {
            await bcrypt.hash(text, salt, null, (err, hash) => {
              if (hash) {
                return resolve(hash);
              }
              return reject(err);
            });
          }
          return reject(err);
        });
      } catch (e) {
        return reject (e);
      }
    });
  }

  static async login(table, columns, filters, order, limit) {
    let data = [];
    try {
      data = await db.select(table, columns, filters, order, limit);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * @async
   * Async function that from the table _User_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_User_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _User_
   *                                   from the database
   * @param  {Array.<object>}  filters list of filter objects to use.
   * @param  {Object}  order   Nullable definition of ORDER paramns.
   * @param  {Object}  limit   Nullable definition of LIMIT params.
   * @return {Promise}         Return a promise with the information from the database.
   */
  static async select(table, columns, filters, order, limit) {
    let data = [];
    try {
      data = await db.select(table, columns, filters, order, limit);
    } catch (e) {
      throw e;
    }
    const response = [];
    for (const res of data) {
      const User = await new UserMdl(res);
      User.list_email = await User.getListEmail();
      User.list_addresses = await User.getAddresses();

      if (User.type === 'ADMIN' || User.type === 'SELLER') {
        User.worker = await User.getWorker();
      }
      response.push(User);
    }
    return response;
  }

  /**
   * @async
   * Async function that from the table _User_ select all the posible tuples
   * with the designated params and returns a promise
   * @param  {string}  table   Table required (_User_) of the database
   * @param  {Array.<string>}  columns Required columns of de table _User_
   *                                   from the database
   * @param  {Array.<object>}  filters list of filter objects to use.
   * @return {Promise}         Return a promise with the information from the database.
   */
  static async count(table, filters) {
    let data = [];
    try {
      data = await db.count(table, filters);
    } catch (e) {
      throw e;
    }
    if (data.length) {
      return data[0].count;
    }
    return false;
  }

  /**
   * @async
   * Async funciton that checks if a user already exists in the
   *  table _User_ of the Database
   * @return {Promise} Return a promise with the information from the database.
   * @version 16/10/2018
   */
  exists() {
    return new Promise(async(resolve, reject) => {
      try {
        if (this.id) {
          const result = await db.select(
            '_User_',
            [
              '*',
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
          if (result.length) {
            return resolve(result[0]);
          }
        }
      } catch (e) {
        return reject(e);
      }
      return resolve(false);
    });
  }

  /**
   * @async
   *Async funcitonthat checks if a user already exists, it will be updated, if not
   * it will be created in the table _User_ in the database
   *
   * @return {Promise} Returns a promise,
   *                    - updated if it already exists
   *                    - true if it is created a new one
   *                    - false if it could not be created
   * @version 16/10/2018
   */
  async save(list_email, worker, list_addresses) {
    console.log('save', this);
    if(await this.exists()) {
      return this.update(list_email, worker, list_addresses);
    }
    return new Promise(async(resolve, reject) => {
      try {
        this.cdu = await this.generateHash(this.cdu);
        const result = await db.create('_User_', this);
        console.log('OK', result);
        if (result) {
          this.id = result.insertId;
          await this.saveListEmail([
            {
              id_user: this.id,
              email: this.main_email,
            },
          ]);
          return resolve(this.id);
        }
      } catch (e) {
        return reject(e);
      }
      return resolve(false);
    });
  }

  /**
   * @async
   * Async function that updates a user from the table _User_ in the Database
   * @return {Promise} Returns a Promise
   *                   - Returns true if it could be updated
   *                   - Returns false if it could not be updated
   * @version 15/10/2018
   */
  update(list_email, worker, list_addresses) {
    console.log('UP', this);
    return new Promise(async (resolve, reject) => {
      try {
        if (this.cdu) {
          console.log('b', this.cdu);
          this.cdu = await this.generateHash(this.cdu);
          console.log('a', this.cdu);
        }
        const result = await db.update(
          '_User_',
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
        );
        if (this.id && result.affectedRows) {
          if (await this.saveListEmail(list_email)) {
            if (await this.saveWorker(worker)) {
              if (await this.saveAddresses(list_addresses)) {
                return resolve(true);
              }
            }
          }
          return resolve(false);
        }
        return resolve(false);
      } catch (e) {
        return reject(e);
      }
    });
  }

  /**
   * @async
   * Async function that deletes a user from the table _User_ in the database .
   * It will check first if the tuple to delete exists
   *
   * @return {Promise} Returns a Promise
   *                   - Return true if it could be deleted
   * @version 15/10/2018
   */
  async delete() {
    if (await this.exists()) {
      try {
        if (await db.delete(
          '_User_',
          {},
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

  /**
   * @async
   * Asynchronous function that obtains the mail of a user.
   * It will look for the status and updates in the table _user_ from
   * the database with the method select
   * @return {Promise} Returns a promise
   *                   - Array with status and updates from a service
   */
  async getListEmail() {
    let list_email = []
    try {
      list_email = await db.select(
        '_ListEmail_',
        [
          '*',
        ],
        [
          {
            attr: 'id_user',
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
    return list_email;
  }

  /**
   * @async
   * Asynchronous function that obtains the worker of a user.
   * It will look for the status and updates in the table _user_ from
   * the database with the method select
   * @return {Promise} Returns a promise
   *                   - Array with status and updates from a service
   */
  async getWorker() {
    let worker = [];
    try {
      worker = await db.select(
        '_Worker_',
        [
          '*',
        ],
        [
          {
            attr: 'id_user',
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
    return worker[0];
  }

  /**
   * @async
   * Asynchronous function that obtains the Address of a user.
   * It will look for the status and updates in the table _user_ from
   * the database with the method select
   * @return {Promise} Returns a promise
   *                   - Array with status and updates from a service
   */
  async getAddresses() {
    let list_addresses = []
    try {
      list_addresses = await db.select(
        '_Address_',
        [
          '*',
        ],
        [
          {
            attr: 'id_user',
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
    return list_addresses;
  }

  /**
   * Asynchronous function that reproduces a parameter with the new set of emails for
   * the user.
   * Obtendrá la antigua lista de correos y luego se comparará con la nueva
   * one.
   * La antigua lista de correos se eliminará de la tabla _User_ desde
   * the database and will be substituted with the new one
   * @param {Array. <object>} new_list_emails array objeto con todo el nuevo correo de usuario
   * @return {Promise}                       Returns a Promise
   *
   * @version 16/10/2018
   */
  async saveListEmail(new_list_email) {
    console.log('THIS', this);
    let old_list_email = [];
    try {
      old_list_email = await db.select(
        '_ListEmail_',
        [
          '*',
        ],
        [
          {
            attr: 'id_user',
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

    for (const n_email in new_list_email) {
      new_list_email[n_email].id_user = this.id;
      for(const o_email in old_list_email) {
        if (new_list_email[n_email] && old_list_email[o_email] && new_list_email[n_email].email === old_list_email[o_email].email) {
          try {
            await db.update(
              '_ListEmail_',
              new_list_email[n_email],
              [
                {
                  attr: 'id_user',
                  oper: '=',
                  val: this.id,
                },
                {
                  logic: 'and',
                  attr: 'email',
                  oper: '=',
                  val: new_list_email[n_email].email,
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
          delete new_list_email[n_email];
          delete old_list_email[o_email];
        }
      }
    }
    for(const n_email in new_list_email) {
      try {
        await db.create(
          '_ListEmail_',
          new_list_email[n_email],
        );
      } catch (e) {
        throw e;
      }
    }
    for(const o_email in old_list_email) {
      try {
        await db.delete(
          '_ListEmail_',
          {},
          [
            {
              attr: 'id_user',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'email',
              oper: '=',
              val: old_list_email[o_email].email,
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
    return true;
  }

  /**
   * Asynchronous function that reproduces a parameter with the new set of functions
   * for which it was worked.
   * It will obtain the old list of status and then will be compared with the new
   * one.
   * The old list of states will be removed from the _StatService_worked table
   * the database and will be substituted with the new one
   * @param {Array. <object>} new_list_stat_worked array object with all new status worked
   * @return {Promise}                       Returns a Promise
   *
   * @version 16/10/2018
   */
  async saveWorker(worker) {
    console.log('THIS', this);
    if (worker && worker !== undefined && worker !== null) {
      worker.id_user = this.id;
      let temp = [];
      try {
        temp = await db.select(
          '_Worker_',
          [
            '*',
          ],
          [
            {
              attr: 'id_user',
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

      if (temp.length) {
        try {
          await db.update(
            '_Worker_',
            worker,
            [
              {
                attr: 'id_user',
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
      } else {
        try {
          await db.create(
            '_Worker_',
            worker,
          );
        } catch (e) {
          throw e;
        }
      }
    } else {
      try {
        db.delete(
          '_Worker_',
          {},
          [
            {
              attr: 'id_user',
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
      } catch (e) {
        throw e;
      }
    }
    return true;
  }

  /**
   * Asynchronous function that reproduces a parameter with the new set of addresses.
   * so it was address.
   * Obtain the list of the previous address and then compare it with the new one.
   * one.
   * The old address list will be removed from the table _StatService_directions
   * The database and will be replaced by the new one.
   * @param {Array. <object>} new_list_stat_worked array object with all the new addresses
   * @return {Promise}                       Returns a Promise
   *
   * @version 15/10/2018
   */
  async saveAddresses(new_list_addresses) {
    console.log('THIS', this);
    let old_list_addresses = [];
    try {
      old_list_addresses = await db.select(
        '_Address_',
        [
          '*',
        ],
        [
          {
            attr: 'id_user',
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

    for (const n_addresses in new_list_addresses) {
      new_list_addresses[n_addresses].id_user = this.id;
      const tmpId = new_list_addresses[n_addresses].id;
      delete new_list_addresses[n_addresses].id;
      for(const o_addresses in old_list_addresses) {
        if (new_list_addresses[n_addresses] && old_list_addresses[o_addresses] && new_list_addresses[n_addresses].id === old_list_addresses[o_addresses].id) {
          try {
            await db.update(
              '_Address_',
              new_list_addresses[n_addresses],
              [
                {
                  attr: 'id_user',
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
          } catch (e) {
            throw e;
          }
          delete new_list_addresses[n_addresses];
          delete old_list_addresses[o_addresses];
        }
      }
    }

    for(const n_addresses in new_list_addresses) {
      try {
        delete new_list_addresses[n_addresses].id;
        await db.create(
          '_Address_',
          new_list_addresses[n_addresses],
        );
      } catch (e) {
        throw e;
      }
    }
    for(const o_addresses in old_list_addresses) {
      try {
        await db.delete(
          '_Address_',
          {},
          [
            {
              attr: 'id',
              oper: '=',
              val: old_list_addresses[o_addresses].id,
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
    return true;
  }

  getName() {
    let name = this.name === undefined ? '' : this.name;
    name += this.sec_name === undefined ? '' : ` ${this.sec_name}`;
    name += this.pat_surname === undefined ? '' : ` ${this.pat_surname}`;
    name += this.mat_surname === undefined ? '' : ` ${this.mat_surname}`;
    return name;
  }

  getPhone() {
    return `${country} (${lada}) ${phone.substr(0, 4)} ${phone.substr(4, 8)}`;
  }
}

module.exports = UserMdl;
