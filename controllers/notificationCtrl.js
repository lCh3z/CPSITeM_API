class notificationCtrl{
  constructor(){
    this.data = [{
      id : 1,
      title : 'Servicio finalizado',
      cont : 'Ya estuvo',
      id_user : 1,
      date : Date.now(),
      prog : ('prog'),
      status : 1,
    },
    {
      id : 2,
      title : 'Servicio finalizado',
      cont : 'Ya',
      id_user : 2,
      date : Date.now(),
      prog : Date.now(),
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
      id : lastId +1,
      title : req.param('title'),
      cont : req.param('cont'),
      id_user : req.param('id_user'),
      date : req.param('date'),
      prog : req.param('prog'),
      status : req.param('status'),
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
      id : Number(req.param('id')),
      title : req.param('title') === undefined ? self.data[id-1].title : req.param('title'),
      cont : req.param('cont') === undefined ? self.data[id-1].cont : req.param('cont'),
      id_user : req.param('id_user') === undefined ? self.data[id-1].id_user : req.param('id_user'),
      date : req.param('date') === undefined ? self.data[id-1].date : req.param('date'),
      prog : req.param('prog') === undefined ? self.data[id-1].prog : req.param('prog'),
      status : req.param('status') === undefined ? self.data[id-1].status : req.param('status'),
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

module.exports = new notificationCtrl();
