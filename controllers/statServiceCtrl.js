class statServiceCtrl{
  constructor(){
    this.data = [{
      id : 1, //integer
      id_service : 1, //integer
      title : 'servicio general', //varchar (64)
      description : 'Servicio de revisión en general', //varchar (4096)
      materials : 'desarmadores y aspiradora', //varchar (2048)
      observations : 'se utiliza en caso de que el equipo esta muy dañado', //varchar (2048)
    },
    {
      id : 2, //integer
      id_service : 2, //integer
      title : 'Cambio de Materiales', //varchar (64)
      description : 'Se realiza cambio de algunas piezas', //varchar (4096)
      materials : 'desarmadores y perica', //varchar (2048)
      observations : 'se realiza el cambio total del equipo', //varchar (2048)
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
    const data = this.data.find(el => el.id === Number(req.params.id));
    const json = {
      response : 'OK',
      data : data
    };
    res.send(json);
  }
  create(req, res){
    const lastId = this.data[this.data.length - 1].id;
    const data = {
      id: lastId + 1,
      id_service : req.param('id_service'),
      title : req.param('title'),
      description : req.param('description'),
      materials : req.param('materials'),
      observations : req.param('observations'),
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
      id_service : req.param('id_service') === undefined ? self.data[id-1].id_service : req.param('id_service'),
      title : req.param('title') === undefined ? self.data[id-1].photo : req.param('photo'),
      description : req.param('description') === undefined ? self.data[id-1].description : req.param('description'),
      materials : req.param('materials') === undefined ? self.data[id-1].materials : req.param('materials'),
      observations : req.param('observations') === undefined ? self.data[id-1].observations : req.param('observations'),
    };
    this.data[Number(req.params.id) - 1] = data;
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

module.exports = new statServiceCtrl();
