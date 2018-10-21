const db = require('../db');

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


  static async login(table, columns, filters, order, limit) {
    let data = [];
    try {
      data = await db.select(table, columns, filters, order, limit);
    } catch (e) {
      throw e;
    }
    return data;
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
      const User = await new UserMdl(res);
      User.list_email = await User.getListEmail();
      User.list_addresses = await User.getAddresses();

      if (User.type === 'ADMIN' || User.type === 'SELLER') {
        User.worker = await User.getWorker();
      } else {
        await User.saveWorker(null);
      }
      response.push(User);
    }
    return response;
  }

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

  async exists() {
    try {
      if (this.id !== undefined) {
        return await db.select(
          '_User_',
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
      }
    } catch (e) {
      throw e;
    }
    return [];
  }

  async save(list_email, worker, list_addresses) {
    const exists = await this.exists();
    if (this.id !== undefined && exists.length) {
      return this.update(list_email, worker, list_addresses);
    }
    try {
      if (await db.create('_User_', this)) {
        const id = await db.select(
          '_User_',
          [
            'id',
          ],
          [
            {
              attr: 'main_email',
              oper: '=',
              val: this.main_email,
            },
          ],
        );
        this.id = id[0].id;
        await this.saveListEmail([
          {
            id_user: id[0].id,
            email: this.main_email,
          },
        ]);
        return id[0].id;
      }
    } catch (e) {
      throw e;
    }
    return false;
  }

  update(list_email, worker, list_addresses) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.id !== undefined && await db.update(
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
        )) {
          if (await this.saveListEmail(list_email)) {
            if (await this.saveWorker(worker)) {
              if (await this.saveAddresses(list_addresses)) {
                return resolve(true);
              }
            }
          }
          return resolve(false);
        }
      } catch (e) {
        return reject(e);
      }
    });
  }

  async delete() {
    const exists = await this.exists();
    if (exists.length) {
      try {
        if (await db.delete(
          '_User_',
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

  async saveListEmail(new_list_email) {
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

  async saveWorker(worker) {
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

  async saveAddresses(new_list_addresses) {
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
