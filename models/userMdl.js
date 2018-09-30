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
      status,
      main_email,
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
    this.status = status;
    this.main_email = main_email;
  }

  static async select(table, columns, filters, order, limit) {
    const data = await db.select(table, columns, filters, order, limit);
    const response = [];
    data.forEach((res) => {
      response.push(new UserMdl(res));
    });
    return response;
  }

  static async count(table, filters) {
    const data = await db.count(table, filters);
    return data[0].count;
  }

  async save() {
    const exists = await db.select('_User_', 'id', [{ attr: 'id', oper: '=', val: this.id }]);
    if (this.id !== undefined && exists.length) {
      return this.update();
    }
    if (await db.create('_User_', this)) {
      const id = await db.select('_User_', 'id', [{ attr: 'main_email', oper: '=', val: this.main_email }]);
      return id[0].id;
    }
    return false;
  }

  async update() {
    if (this.id !== undefined && await db.update('_User_', this, [{ attr: 'id', oper: '=', val: this.id }])) {
      return this.id;
    }
    return false;
  }

  async delete() {
    const exists = await db.select('_User_', 'id', [{ attr: 'id', oper: '=', val: this.id }]);
    if (this.id !== undefined && exists.length !== 0) {
      this.status = 0;
      if (await this.update()) {
        return true;
      }
    }
    return false;
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
