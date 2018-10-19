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
    this.expires = expires;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  static add({
    token,
    id_user,
    type,
    expires,
    status
  }) {
    try {
      return db.create(
        '_Token_',
        {
          token,
          id_user,
          type,
          expires,
          status
        }
      );
    } catch (e) {
      throw (e);
    }
  }
}

module.exports = Token;
