class listProdCtrl{
  constructor(){
    this.data = [{
      id_order: 1,
      id_product: 1,
      quantity: 7,
      price: 12000,
      date: Date.now(),
    },
    {
      id_order: 2,
      id_product: 2,
      quantity: 7,
      price: 12000,
      date: Date.now(),
    },
  ];
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  getAll(req, res){
    const json = {
      response : 'OK',
      data : this.data
    };
    res.send(json);
  }
  create(req, res){
    const data = {
      id_order: Number(req.param('id_order')),
      id_product: Number(req.param('id_product')),
      quantity: Number(req.param('quantity')),
      price: Number(req.param('price')),
      date: Date.now(),
    };
    this.data.push(data);
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);

  }
  update(req, res){
    let self = this;
    let id = Number(req.params.id_order);
    let data = this.data.find(el => el.id_order === id);
    data = {
      id_order: req.param('id_order') === undefined ? self.data[id-1].id_order : Number(req.param('id_order')),
      id_product: req.param('id_product') === undefined ? self.data[id-1].id_product : Number(req.param('id_product')),
      quantity: req.param('quantity') === undefined ? self.data[id-1].quantity : Number(req.param('quantity')),
      price: req.param('price') === undefined ? self.data[id-1].price : Number(req.param('price')),
      date: req.param('date') === undefined ? self.data[id-1].date : req.param('date'),
    };
    this.data[Number(req.params.id_order) -1] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
  delete(req, res){
    const data = this.data.find(el => el.id_order === Number(req.params.id_order));
    this.data.splice(this.data.indexOf(data), 1);
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new listProdCtrl();
