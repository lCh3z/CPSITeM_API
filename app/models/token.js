const db = require('../db');
class Token {
  static async add({
    token,
    id_user,
    expiter,
    type,
    status
  }, next) {
    try {
      console.log('TOKEN',{
        token,
        id_user,
        expiter,
        type,
        status
      });
      return await db.create(
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
