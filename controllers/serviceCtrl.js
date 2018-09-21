class serviceCtrl{
  constructor(){
    this.data = [{
      id : 1,//integer
      id_seller : 1, //integer
      id_client : 1, //integer
      hospital : 'Mexico Americano', //varchar (84)
      status : 1, //tinyint
      date :  Date.now(), //datetime
      type : 'Servicio', //varchar(10)
      equipment : 'De todo', //varchar (50)
      model : 'GT-90', //varchar (32)
      serial : '1290', //varchar (16)
      location : 'La cima', //varchar (25)
      contract : 12 //integer
      description : 'Esta bien freson', //varchar (6000)
      voucher : 'no', //varchar (124)
    },
    {
      id : 2,//integer
      id_seller : 2, //integer
      id_client : 2, //integer
      hospital : 'Puerta de Hierro', //varchar (84)
      status : 1, //tinyint
      date :  Date.now(), //datetime
      type : 'Mantenimiento', //varchar(10)
      equipment : 'De todo', //varchar (50)
      model : 'GT-1012', //varchar (32)
      serial : '1291', //varchar (16)
      location : 'Puerta de Hierro', //varchar (25)
      contract : 13 //integer
      description : 'Lo mas cool', //varchar (6000)
      voucher : 'nose', //varchar (124)
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
    const lastId = this.data[this.data.length -1].id;
    const data = {
      id: lastId +1,
      id_seller : req.param('id_seller')
      id_client : req.param('id_client')
      hospital : 'Puerta de Hierro', //varchar (84)
      status : 1, //tinyint
      date :  req.param('date')
      type : req.param('type')
      equipment : req.param('equipment')
      model : req.param('model')
      serial : req.param('serial')
      location : req.param('location')
      contract : req.param('contract')
      description : req.param('description')
      voucher : req.param('voucher')
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
      id_seller: req.param('id_seller') === undefined ? self.data[id-1].id_seller : req.param('id_seller'),
      id_client: req.param('id_client') === undefined ? self.data[id-1].id_client : req.param('id_client'),
      hospital: req.param('hospital') === undefined ? self.data[id-1].hospital : req.param('hospital'),
      status: req.param('status') === undefined ? self.data[id-1].status : req.param('status'),
      date: req.param('date') === undefined ? self.data[id-1].date : req.param('date'),
      type: req.param('type') === undefined ? self.data[id-1].type : req.param('type'),
      equipment: req.param('equipment') === undefined ? self.data[id-1].equipment : req.param('equipment'),
      model: req.param('model') === undefined ? self.data[id-1].model : req.param('model'),
      serial: req.param('serial') === undefined ? self.data[id-1].serial : req.param('serial'),
      location: req.param('location') === undefined ? self.data[id-1].location : req.param('location'),
      contract: req.param('contract') === undefined ? self.data[id-1].contract : req.param('contract'),
      description: req.param('description') === undefined ? self.data[id-1].description : req.param('description'),
      voucher: req.param('voucher') === undefined ? self.data[id-1].voucher : req.param('voucher'),
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

module.exports = new serviceCtrl();
