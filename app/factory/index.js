const models = require('../models');

class Factory {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  async createUser(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.UserMdl(base).save();
    }
    return status;
  }

  async createOrder(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.OrderMdl(base).save();
    }
    return status;
  }

  async createService(num) {
    let status = true;
    for(let i = 0; i < num && status; i += 1) {
      status = await new models.ServiceMdl({
        id_seller: 1,
        id_user: 2,
        hospital: 'dummie',
      }).save([
        {
          title: 'Testing status post',
          description: null,
          materials: null,
          observations: null,
          imgs: [
            {
              photo: 'p1.jpg',
              status: 1,
            },
          ],
        }
      ]);
    }
    return status;
  }

  async createProduct(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ProductMdl(base).save();
    }
    return status;
  }

  async createNotification(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.NotificationMdl(base).save();
    }
    return status;
  }

  async createStatService(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.StatServiceMdl(base).save();
    }
    return status;
  }

  async createImgStatService(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ImgStatServiceMdl(base).save();
    }
    return status;
  }

  async createCategory(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.CategoryMdl(base).save();
    }
    return status;
  }

  async createImgProduct(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ImgProductMdl(base).save();
    }
    return status;
  }

  async createAddress(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.AddressMdl(base).save();
    }
    return status;
  }

  async createPayment(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.PaymentMdl(base).save();
    }
    return status;
  }

  async createSection(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.SectionMdl(base).save();
    }
    return status;
  }

  async createConfSection(num) {
    let status = 0;
    for(let i = 0; i < num && status === 0; i += 1) {
      status = await new models.ConfSectionMdl(base).save();
    }
    return status;
  }
}

module.exports = new Factory();
