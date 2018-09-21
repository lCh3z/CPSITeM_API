class imgProductCtrl{
  constructor(){
    this.data = [{
      id_prod : 1,
      photo : 'foto.png',
    },
    {
      id_prod : 2,
      photo : 'foto.png',
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
    const data = this.data.find(el => el.id_prod === Number(req.params.id));
    const json = {
      response : 'OK',
      data : data
    };
    res.send (json);
  }
  create(req, res){
    const data = {
      id_prod : req.param('id_prod'),
      photo : req.param('photo')
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
    let id = Number(req.params.id_prod);
    let data = this.data.find(el => el.id_prod === id);
    data = {
      id_prod : Number(req.param('id_prod')),
      photo : req.param('photo') === undefined ? self.data[id-1].photo : req.param('photo')
    };
    this.data[Number(req.params.id_prod) -1] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
  delete(req, res){
    const data = this.data.find(el => el.id_prod === Number(req.params.id_prod));
    this.data.splice(this.data.indexOf(data), 1);
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new imgProductCtrl();
