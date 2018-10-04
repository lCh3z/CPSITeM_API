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

  static async select(table, columns, filters, order, limit) {
    let data = [];
    try {
      data = await db.select(table, columns, filters, order, limit);
    } catch (e) {
      throw e;
    }
    const response = [];
    for (const res in data) {
      const User = await new UserMdl(data[res]);
      User.list_email = await User.getListEmail();

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
        const result = await db.select(
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
        return result;
      }
    } catch (e) {
      throw e;
    }
    return [];
  }

  async save() {
    const exists = await this.exists();
    if (this.id !== undefined && exists.length) {
      return this.update();
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
        let last_num = await db.max(
          '_ListEmail_',
          'number',
          [
            {
              attr: 'id_user',
              oper: '=',
              val: this.id_user,
            },
          ],
        );
        last_num = last_num[0].number;
        if (!last_num) {
          last_num = 1;
        } else {
          last_num += 1;
        }
        await db.create(
          '_ListEmail_',
          {
            id_user: id[0].id,
            email: this.main_email,
            number: last_num,
          },
        );
        return id[0].id;
      }
    } catch (e) {
      throw e;
    }
    return false;
  }

  async update(list_email, worker) {
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
        this.saveListEmail(list_email);
        this.saveWorker(worker);
        return true;
      }
    } catch (e) {
      throw e;
    }
    return false;
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
        )) return true;
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
          new_list_email[n_email].number = old_list_email[o_email].number;
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
          old_list_email[o_email],
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
          { status: 0 },
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
