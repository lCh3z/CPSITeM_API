class productCtrl{
  constructor(){
    this.data = [{
      id: 1,
      id_cat: 1,
      name: 'Pancho',
      price: 12312,
      status: 1,
      discount: 12312,
      inventory: 12,
      description: 'Está chido',
      specs: 'Tiene pantalla',
      min_quan: 15,
      date: Date.now(),
    },
    {
      id: 2,
      id_cat: 2,
      name: 'Pancho',
      price: 123,
      status: 1,
      discount: 12,
      inventory: 15,
      description: 'Está chido',
      specs: 'Tiene pantalla',
      min_quan: 19,
      date: Date.now(),
    },
  ];
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
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
  get(req, res){
    const data = this.data.find(el => el.id === Number(req.params.id));
    const json = {
      response : 'OK',
      data : data
    };
    res.send(json);
  }
  create(req, res){
    const lastId = this.data[this.data.length -1].id;
    const data = {
      id: lastId +1,
      id_cat: req.param('id_cat'),
      name: req.param('name'),
      price: req.param('price'),
      status: req.param('status'),
      discount: req.param('discount'),
      inventory: req.param('inventory'),
      description: req.param('description'),
      specs: req.param('specs'),
      min_quan: req.param('min_quan'),
      date: req.param('date'),
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
    let id = Number(req.params.id);
    let data = this.data.find(el => el.id === id);
    data = {
      id: Number(req.param('id')),
      id_cat: req.param('id_cat') === undefined ? self.data[id-1].id_cat : req.param('id_cat'),
      name: req.param('name') === undefined ? self.data[id-1].name : req.param('name'),
      price: req.param('price') === undefined ? self.data[id-1].price : req.param('price'),
      status: req.param('status') === undefined ? self.data[id-1].status : req.param('status'),
      discount: req.param('discount') === undefined ? self.data[id-1].discount : req.param('discount'),
      inventory: req.param('inventory') === undefined ? self.data[id-1].inventory : req.param('inventory'),
      description: req.param('description') === undefined ? self.data[id-1].description : req.param('description'),
      specs: req.param('specs') === undefined ? self.data[id-1].specs : req.param('specs'),
      min_quan: req.param('min_quan') === undefined ? self.data[id-1].min_quan : req.param('min_quan'),
      date: req.param('date') === undefined ? self.data[id-1].date : req.param('date'),
    };
    this.data[Number(req.params.id) -1] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
  delete(req, res){
    this.data[Number(req.params.id) -1].status = 0;
    const data = this.data.find(el => el.id === Number(req.params.id));
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new productCtrl();
