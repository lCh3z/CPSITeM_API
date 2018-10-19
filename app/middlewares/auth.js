const bcrypt = require('bcrypt-nodejs');
const { UserMdl, Token } = require('../models');

class Auth {
  constructor() {
    this.register = this.register.bind(this);
  }

  generateHash(text, next) {
    return new Promise(async (resolve, reject) => {
      try {
        await bcrypt.genSalt(process.env.SALT_ROUND, async (err, salt) => {
          if (salt) {
            await bcrypt.hash(text, salt, null, (err, hash) => {
              if (hash) {
                return resolve(hash);
              }
              return reject(err);
            });
          }
          return reject(err);
        });
      } catch (e) {
        return next (err);
      }
    });
  }

  async register(req, res, next) {
    const User = new UserMdl(req.body);
    try {
      User.cdu = await this.generateHash(req.body.cdu, next);
      await User.save();
      const hash = await this.generateHash(new Date(), next);
      let expires = Date.now() + Number(process.env.USER_TIME) * 60000;
      expires = new Date(expires).toISOString().slice(0, 19).replace('T', ' ');
      if (await Token.add({
        token: hash,
        id_user: User.id,
        expires,
        type: 'SESSION',
        status: 1,
      })) {
        req.body.message = { token: hash };
      }
    } catch (e) {
      return next(e);
    }
    return next();
  }
}

module.exports = new Auth();
