const bcrypt = require('bcrypt-nodejs');

const { UserMdl, Token } = require('../models');

class Auth {
  constructor() {
    this.register = this.register.bind(this);
  }

  static async register(req, res, next) {
    const User = new UserMdl(req.body);
    try {
      await User.save();
    } catch (e) {
      next(e);
    }
    console.log('USER', User);
    console.log('A');
    try {
      bcrypt.hash(req.cdu, null, null, async (err, hash) => {
        if (!err) {
          console.log('B');
          let expires = Date.now();
          expires += process.env.USER_TIME * 60000;
          expires = new Date(expires).toISOString().slice(0, 19).replace('T', ' ');
          try {
            console.log('TOKEN', {
              token: hash,
              id_user: User.id,
              expiter: expires,
              type: 1,
              status: 1,
            });
            await Token.add({
              token: hash,
              id_user: User.id,
              expiter: expires,
              type: 1,
              status: 1,
            }, next);
          } catch (e) {
            throw (e);
          }
        }
        throw (err);
      });
    } catch (e) {
      throw (e);
    }
    res.status(500).send('HOLA')
  }
}

module.exports = Auth;
