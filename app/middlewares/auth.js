const bcrypt = require('bcrypt-nodejs');
const { UserMdl, Token } = require('../models');

class Auth {
  constructor() {
    this.register = this.register.bind(this);
  }

  generateHash(text) {
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
        return reject (err);
      }
    });
  }

  async register(req, res, next) {
    const User = new UserMdl(req.body);
    try {
      User.cdu = await this.generateHash(req.body.cdu, next);
      await User.save();
      const hash = await this.generateHash(new Date());
      const token = new Token({
        token: hash,
        id_user: User.id,
        type: 'USER_SESSION',
        status: 1,
      });
      if (await token.save()) {
        req.body.message = { token: hash };
      }
    } catch (e) {
      return next(e);
    }
    next();
  }

  async login(req, res, next) {
    const User = {
      main_email: req.body.main_email,
      cdu: req.body.cdu
    };
    try {
      let data = await UserMdl.login(
        '_User_',
        [
          'id',
          'main_email',
          'cdu'
        ],
        [
          {
            attr: 'main_email',
            oper: '=',
            val: User.main_email
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0
          }
        ],
        null,
        null
      );
      if (!data.length) {
        req.body.message = { main_email: 'This email doesn\'t exists in our database' };
        next();
      } else {
        const hash = data[0].cdu;
        await bcrypt.compare(User.cdu, hash, async (err, result) => {
          if (err) {
            return next(err);
          }
          if (result) {
            const hashTemp = await this.generateHash(new Date());
            const token = new Token({
              token: hashTemp,
              id_user: data[0].id,
              type: 'USER_SESSION',
              status: 1,
            });
            if (await token.save()) {
              req.body.message = { token: hashTemp };
            }
            //req.body.message = { token: hash };
          } else {
            req.body.message = { password: 'Passwords doesn\'t match' };
          }
          next();
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async logout(req, res, next) {
    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    token = new Token({ token });
    try {
      if (await token.close()) {
        req.body.message = { session: 'Session was closed' };
      } else {
        req.body.message = { session: 'Session is already closed' };
      }
      next();
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = Auth;
