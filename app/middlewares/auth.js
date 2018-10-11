const bcrypt = require('bcrypt');

const { User } = require('./models');

class Auth{
  constructor(){
    this.register = register.bind(this);
  }

  register(req, res, next){
    user = User.register(req.body);

    cont token = bcrypt.hash('untoken', process.env.SECRET);
    const created = new Date();
    const expires = created + 12;
    Token.add({
      token,
      created: created,
      id_user: user.id,
      expiter: expires
      type: 1,
      status: 1,
    })
  }

}

module.exports = new Auth();
