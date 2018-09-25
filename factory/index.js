const models = require('../models');

class Factory {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  async createUser(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.UserMdl(base).save();
    }
    return status;
  }

  async createOrder(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.OrderMdl(base).save();
    }
    return status;
  }

  async createService(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ServiceMdl(base).save();
    }
    return status;
  }

  async createProduct(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ProductMdl(base).save();
    }
    return status;
  }

  async createNotification(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.NotificationMdl(base).save();
    }
    return status;
  }

  async createStatService(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.StatServiceMdl(base).save();
    }
    return status;
  }

  async createImgStatService(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ImgStatServiceMdl(base).save();
    }
    return status;
  }

  async createCategory(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.CategoryMdl(base).save();
    }
    return status;
  }

  async createImgProduct(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ImgProductMdl(base).save();
    }
    return status;
  }

  async createAddress(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.AddressMdl(base).save();
    }
    return status;
  }

  async createPayment(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.PaymentMdl(base).save();
    }
    return status;
  }

  async createSection(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.SectionMdl(base).save();
    }
    return status;
  }

  async createConfSection(base, num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ConfSectionMdl(base).save();
    }
    return status;
  }
}

module.exports = new Factory();
