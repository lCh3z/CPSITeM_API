class workerCtrl{
  constructor(){
    this.data = [{
      id_user: 1, //integer
      position : 'donde sea', //varchar (32)
      depart : 'ventas', //varchar(32)
    },
    {
      id_user: 1, //integer
      position : 'es pedro', //varchar (32)
      depart : 'ventas', //varchar(32)
    }
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
    const data = this.data.find(el => el.id_user === Number(req.params.id_user));
    const json = {
      response : 'OK',
      data : data
    };
    res.send(json);
  }
  create(req, res){
    const lastId = this.data[this.data.length - 1].id_user;
    const data = {
      id_user: lastId + 1,
      position : req.param('position'),
      depart : req.param('depart'),
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
      id : Number(req.param('id_user')),
      position : req.param('position') === undefined ? self.data[id-1].position: req.param('position'),
      depart : req.param('depart') === undefined ? self.data[id-1].depart : req.param('depart'),
    };
    this.data[Number(req.params.id) - 1] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
  delete(req, res){
    this.data[Number(req.params.id_user) - 1].status = 0;
    const data = this.data.find(el => el.id === Number(req.params.id_user));
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new workerCtrl();
