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

  async exists() {
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
              val: this.token,
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
      return [];
    } catch (e) {
      throw e;
    }
  }

  async save() {
    const tempToken = await this.exists();
    if (tempToken.length && this.id !== undefined) {
      try {
        tempToken.expires = this.expires;
        return db.update(
          '_Token_',
          this,
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
    } else {
      try {
        return db.create(
          '_Token_',
          this,
        );
      } catch (e) {
        throw e;
      }
    }
  }
}

module.exports = Token;
