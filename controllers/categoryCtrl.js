class categoryCtrl{
  constructor(){
    this.data = [{
      id : 1,
      name : 'maquina',
      description : 'maquina1',
      photo : 'foto.jpeg',
      date : '2018-9-20',
      status : 1,
    },
    {
      id : 1,
      name : 'maquina',
      description : 'maquina2',
      photo : 'foto.jpeg',
      date : '2018-9-20',
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
      id : lastId + 1,
      name : req.param('name'),
      description : req.param('description'),
      photo : req.param('photo'),
      date : req.param('date'),
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
      name : req.param('name') === undefined ? self.data[id-1].name : req.param('name'),
      description : req.param('description') === undefined ? self.data[id-1].description : req.param('description'),
      photo : req.param('photo') === undefined ? self.data.[id-1].photo : req.param('photo'),
      date : req.param('date') === undefined ? self.data[id-1].date : req.param('date'),
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

module.exports = new categoryCtrl();
