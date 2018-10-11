const bcrypt = require('bcrypt');

const { UserCtrl } = require('./controllers');

class Auth{
  constructor(){
    this.register = register.bind(this);
  }

  register(req, res, next){
    UserCtrl.create(req, res, next);

    const token =  bcrypt.hash('untoken', process.env.SECRET);
    const created = new Date();
    const expires = created + process.env.USER_TIME;
    Token.add({
      token,
      created: created,
      id_user: user.id,
      expiter: expires,
      type: 1,
      status: 1,
    })
  }
}

module.exports = new Auth();
