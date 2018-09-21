class orderCtrl{
  constructor(){
    this.data = [{
      id : 1,
      id_user : 1,
      id_address : 1,
      id_payment :1,
      id_cuppon : 'XMAS',
      date : Date.now(),
      status : 1,
    },
    {
      id : 2,
      id_user : 2,
      id_address : 2,
      id_payment :2,
      id_cuppon : 'ZMAS',
      date : Date.now(),
      status : 1,
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
      id_user: req.param('id_user'),
      id_address: req.param('id_address'),
      id_payment:req.param('id_payment'),
      id_cuppon: req.param('id_cuppon'),
      date: req.param('date'),
      status: req.param('status'),
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
      id_user: req.param('id_user') === undefined ? self.data[id-1].id_user : req.param('id_user'),
      id_address: req.param('id_address') === undefined ? self.data[id-1].id_address : req.param('id_address'),
      id_payment:req.param('id_payment') === undefined ? self.data[id-1].id_payment : req.param('id_payment'),
      id_cuppon: req.param('id_cuppon') === undefined ? self.data[id-1].id_cuppon : req.param('id_cuppon'),
      date: req.param('date') === undefined ? self.data[id-1].date : req.param('date'),
      status: req.param('status') === undefined ? self.data[id-1].status : req.param('status'),
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

module.exports = new orderCtrl();
