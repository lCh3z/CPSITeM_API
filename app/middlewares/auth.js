const bcrypt = require('bcrypt-nodejs');
const { UserMdl, Token, Response } = require('../models');

class Auth {
  constructor() {
    this.register = this.register.bind(this);
    this.generateHash = this.generateHash.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLogged = this.isLogged.bind(this);
    this.getToken = this.getToken.bind(this);
    this.isAlive = this.isAlive.bind(this);
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
      next();
    } catch (e) {
      return next(e);
    }
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
    const token = new Token({ token: this.getToken(req.headers) });
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

  async isLogged(req, res, next) {
    const response = new Response();
    let token = new Token({ token: this.getToken(req.headers) });
    try {
      token = await token.exists();
      if (token.id) {
        if (this.isAlive(token)) {
          let User = new UserMdl({ id: token.id_user });
          User = await User.exists();
          console.log('USER', User);
          if (User.type) {
            token.user = User;
            req.params.token = token;
            next();
          } else {
            response.bad()
              .setStatus(409)
              .setDetail(token.type, 'We could not load your information');
            return next(response);
          }
        } else {
          response.bad()
            .setStatus(403)
            .setDetail(token.type, 'You must be logged in', 'Session expired');
          return next(response);
        }
      } else {
        response.bad()
          .setStatus(403)
          .setDetail(token.type, 'You must be logged in');
        return next(response);
      }
    } catch (e) {
      return next(e);
    }
  }

  isAlive(token) {
    const now = new Date();
    if (now > token.expires) {
      token.close();
      return false;
    }
    return true;
  }

  getToken(headers) {
    return headers.authorization
      ? headers.authorization.split(' ')[1]
      : false;
  }

  havePermit(req, res, next, permits) {
    console.log('M', req.method);
    console.log('PER', permits);
    const response = new Response();
    if (req.params.token.user.type) {
      let permit = false;
      Object.keys(permits).forEach((oper) => {
        if (oper === req.method) {
          const types = permits[oper].split(',');
          types.forEach((type) => {
            console.log('CMP', req.params.token.user.type, type);
            if (type === req.params.token.user.type) {
              permit = true;
            }
          });
        }
      });
      if (!permit) {
        response.bad()
          .setStatus(401)
          .setDetail('PERMITS', 'You have not permits');
        return next(response);
      }else {
        next();
      }
    } else {
      response.bad()
        .setStatus(409)
        .setDetail('PERMITS', 'Error loading your user type');
      return next(response);
    }
  }
}

module.exports = new Auth();
