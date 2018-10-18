const db = require('../db');
class Token {
  static add({
    token,
    id_user,
    expiter,
    type,
    status
  }) {
    try {
      return db.create(
        'tokens',
        {
          token,
          id_user,
          expiter,
          type,
          status
        }
      );
    } catch (e) {
      throw (e);
    }
  }
}

module.exports = Token;
