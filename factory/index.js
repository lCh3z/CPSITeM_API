const { UserMdl } = require('../models');

class Factory {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  async createUser(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new UserMdl(base).save();
    }
    return status;
  }
}

module.exports = new Factory();
