const bcrypt = require('bcrypt-nodejs');
const { UserMdl, Token } = require('../models');

class Auth {
  constructor() {
    this.register = this.register.bind(this);
  }

  async register(req, res, next) {
    const User = new UserMdl(req.body);
    try {
      await User.save();
    } catch (e) {
      return next(e);
    }
    try {
      bcrypt.genSalt(Number(process.env.SALT_ROUND), function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(req.body.cdu, salt, null, (err, hash) => {
          if (err) {
            return next(err);
          }
          let expires = Date.now() + Number(process.env.USER_TIME) * 60000;
          expires = new Date(expires).toISOString().slice(0, 19).replace('T', ' ');
          return Token.add({
            token: hash,
            id_user: User.id,
            expiter: expires,
            type: 1,
            status: 1,
          }, next);
          next();
        });
      });
    } catch (e) {
      return next(e);
    }
    return next();
  }
}

module.exports = new Auth();
