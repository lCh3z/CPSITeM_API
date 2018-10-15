const bcrypt = require('bcrypt');

const { UserMdl} = require('../models');

class Auth{
  constructor(){
    this.register = register.bind(this);
  }

  static async register(req, res, next){
    const User = new UserMdl(req.body);
    await User.save();

    const token =  bcrypt.hash('untoken', process.env.SECRET);
    const created = new Date();
    const expires = created + process.env.USER_TIME;
    Token.add({
      token,
      created: created,
      id_user: User.id,
      expiter: expires,
      type: 1,
      status: 1,
    });
    next();
  }
}

module.exports = Auth;
