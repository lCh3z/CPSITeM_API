const db = require('../db');
const { NewsListMdl } = require('../models');

class newsListCtrl{
  constructor(){
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getAll = this.getAll.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new NewsListMdl(res));
    });
    return result;
  }

  async getAll(req, res){
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

    let data = await db.getAll(
      '_NewsList_',
      [
        'email',
        'status',
      ],
      filters,
      order,
      {
        start,
        quant: per_page,
      },
    );
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newList = new NewsListMdl(req.body);

    const result = await newList.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const newList = new NewsListMdl(req.body);
    newList.id = req.param('id');

    const result = await newList.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }
}

module.exports = new newsListCtrl();
