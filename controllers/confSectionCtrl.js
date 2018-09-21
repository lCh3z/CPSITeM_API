class confSectionCtrl{
  constructor(){
    this.data = [{
      id : 1,
    photo : 'foto.jpeg',
    title : 'titulo',
    subtitle : 'subtitulo',
    type : 1,
    description : 'descripcion',
  },
  {
    id : 2,
    photo : 'foto.jpeg',
    title : 'titulo',
    subtitle : 'subtitulo',
    type : 2,
    description : 'descripcion',
    }];
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
    const lastId = this.data[this.data.length -1].id;
    const data = {
      id : lastId + 1,
    photo : req.param('photo'),
    title : req.param('title'),
    subtitle : req.param('subtitle'),
    type : req.param('type'),
    description : req.param('description'),
    }
  }
  update(req, res){
    let self = this;
    let id = Number(req.params.id);
    let data = this.data.find(el => el.id === id);
    data = {
      id : Number(req.param('id')),
    photo : req.param('photo') === undefined ? self.data[id-1].photo : req.param('photo'),
    title : req.param('title') === undefined ? self.data[id-1].title : req.param('title'),
    subtitle : req.param('subtitle') === undefined ? self.data[id-1].subtitle : req.param('subtitle'),
    type : req.param('type') === undefined ? self.data[id-1].type : req.param('type'),
    description : req.param('description') === undefined ? self.data[id-1].description : req.param('description'),
  };
  this.data[Number(req.params.id) -1] = data;
  const json = {
    response : 'OK',
    data : data
  };
  res.status(201).send(json);
  }
  delete(req, res){
    const data = this.data.find(el => el.id === Number(req.params.id));
    this.data.splice(this.data.indexOf(data), 1);
    const json = {
      response :'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new confSectionCtrl();
