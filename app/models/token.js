const db = require('../db');

class Token {
  constructor(
    {
      id,
      token,
      id_user,
      type,
      expires,
      status,
      date,
      updated,
    },
  ) {
    this.id = id;
    this.token = token;
    this.id_user = id_user;
    this.type = type;
    this.expires = null;
    this.status = status;
    this.date = date;
    this.updated = updated;

    this.updateExpire();
  }

  updateExpire() {
    if (this.type) {
      this.expires = Date.now() + Number(process.env[this.type]) * 60000;
      this.expires = new Date(this.expires).toISOString().slice(0, 19).replace('T', ' ');
    }
    return null;
  }

  async get(token) {
    try {
      if (this.token !== undefined) {
        return await db.select(
          '_Token_',
          [
            '*',
          ],
          [
            {
              attr: 'token',
              oper: '=',
              val: token,
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

  async save() {
    const tempToken = await this.get(this.token);
    if (tempToken.length) {
      this.id = tempToken[0].id;
      try {
        return db.update(
          '_Token_',
          {
            expires: this.expires,
            status: this.status,
          },
          [
            {
              attr: 'id',
              oper: '=',
              val: this.id,
            },
          ],
        );
      } catch (e) {
        throw e;
      }
    } else if (this.id_user) {
      try {
        return db.create(
          '_Token_',
          this,
        );
      } catch (e) {
        throw e;
      }
    } else {
      return false;
    }
  }

  async close() {
    Object.keys(this).forEach((key) => {
      if (key !== 'token' && key !== 'expires') {
        delete this[key];
      }
    });
    this.status = 0;
    const result = await this.save()
    return result;
  }
}

module.exports = Token;
