const db = require('../db');
const { PaymentMdl } = require('../models');
const { Responses } = require('../models');
class paymentCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  async processResult(data, next) {
    try {
      let temp;
      let result = [];
      for (const res of data) {
        temp = new PaymentMdl(res);
        result.push(temp);
      }
      return result;
    } catch (e) {
      next(e);
    }
  }


  async getAll(req, res, next) {
    try {
<<<<<<< HEAD
      let page = parseInt(req.param('page'));
      let per_page = parseInt(req.param('per_page'));
      if (!page) {
        page = 0;
      }
      if (!per_page) {
        per_page = 20;
      }
      const start = page * per_page;

      let find = parseInt(req.param('find'));
      let f_col = parseInt(req.param('f_col'));
      const filters = null;
      if (find && f_col) {
        filters = [];
        filters.push(
          {
            attr: f_col,
            oper: 'LIKE',
            val: find,
          },
        );
      }

      let order = null;
      let ord = parseInt(req.param('order'));
      let ord_by = parseInt(req.param('ord_by'));
      let des = parseInt(req.param('desc'));
      if (ord && ord_by) {
        order = {};
        order.by =  ord_by;
        if (des) {
          order.desc = true;
        } else {
          order.desc = false;
        }
      }

=======
      const page = parseInt(req.param('page'));
      const per_page = parseInt(req.param('per_page'));
      const start = page * per_page;

>>>>>>> release
      let data = await PaymentMdl.select(
        '_Payment_',
        [
          '*',
        ],
<<<<<<< HEAD
        filters,
        order,
=======
        null,
        null,
>>>>>>> release
        {
          start,
          quant: per_page,
        },
      );

      data = await this.processResult(data, next);

      if (data.length === 0) {
        res.status(500).send(Responses.notFound('Payment'));
      } else {
        const total = await PaymentMdl.count(
          '_Payment_',
          '',
          '',
        );

        res.status(200).send({
          data,
          per_page,
          page,
          total,
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      let data = await PaymentMdl.select(
        '_Payment_',
        [
          '*',
        ],
        [
          {
            attr: 'id',
            oper: '=',
            val: Number(req.param('id')),
          },
        ],
        null,
        null,
      );

      [data] = await this.processResult(data, next);

      if (!data) {
        res.status(500).send(Responses.notFound('Payment'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let result = await new PaymentMdl(req.body).save();
      if (result) {
        res.status(201).send(Responses.created('Payment'));

      } else {
        return res.status(500).send(Responses.cantCreate('Payment'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next){
    try {
      const Payment = new PaymentMdl(req.body);
      Payment.id = Number(req.param('id'));

      const result = await Payment.update();

      if(!result){
        res.status(500).send(Responses.cantRegister('Payment'));
      }
      res.status(201).send(Responses.updated('Payment'));
  } catch (e) {
    next(e);
  }
}

  async delete(req, res, next) {
    try {
      const Payment = new PaymentMdl({
        id: Number(req.param('id')),
      });

      const result = await Payment.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Payment'));
      }
      res.status(201).send(Responses.deleted('Payment'));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new paymentCtrl();
