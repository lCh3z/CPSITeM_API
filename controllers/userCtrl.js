class userCtrl{
  constructor(){
    this.data = [{
      id: 1, //integer
      photo : 'fotografia.jpeg', //varchar (124)
      name : 'Oscar', //varchar (16)
      sec_name : 'Eduardo', //varchar (16)
      pat_surname : 'Martinez', //varchar(34)
      mat_surname : 'Gonzalez', //varchar(32)
      rfc : 'MAGO980316', //varchar (13)
      phone : '3315291097', //varchar (17)
      status : 1, //tinyint
      cdu : '123', //varchar (124)
      main_email : 'oscar_1698@hotmail.com', //varchar(84)
      type : 1, //tinyint
      position : 'donde sea', //varchar (32)
      depart : 'ventas', //varchar(32)
    },
    {
      id: 1, //integer
      photo : 'fotografia.jpeg', //varchar (124)
      name : 'Luis', //varchar (16)
      sec_name : 'Pedro', //varchar (16)
      pat_surname : 'Ochoa', //varchar(34)
      mat_surname : 'Duran', //varchar(32)
      rfc : 'OUDL200996', //varchar (13)
      phone : '3315292019', //varchar (17)
      status : 1, //tinyint
      cdu : '456', //varchar (124)
      main_email : 'pedrito@hotmail.com', //varchar(84)
      type : 1, //tinyint
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
      photo : req.param('photo'),
      name : req.param('name'),
      sec_name : req.param('sec_name'),
      pat_surname : req.param('pat_surname'),
      mat_surname : req.param('mat_surname'),
      rfc : req.param('rfc'),
      phone : req.param('phone'),
      status : req.param('status'),
      cdu : req.param('cdu'),
      main_email : req.param('main_email'),
      type : req.param('type'),
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
      id : Number(req.param('id')),
      photo : req.param('photo') === undefined ? self.data[id-1].photo : req.param('photo'),
      name : req.param('name') === undefined ? self.data[id-1].name : req.param('name'),
      sec_name : req.param('sec_name') === undefined ? self.data[id-1].sec_name : req.param('sec_name'),
      pat_surname : req.param('mat_surname') === undefined ? self.data[id-1].pat_surname : req.param('pat_surname'),
      mat_surname : req.param('mat_surname') === undefined ? self.data[id-1].mat_surname : req.param('mat_surname'),
      rfc : req.param('rfc') === undefined ? self.data[id-1].rfc : req.param('rfc'),
      phone : req.param('phone') === undefined ? self.data[id-1].phone : req.param('phone'),
      status : req.param('status') === undefined ? self.data[id-1].status : req.param('status'),
      cdu : req.param('cdu') === undefined ? self.data[id-1].cdu : req.param('cdu'),
      main_email : req.param('main_email') === undefined ? self.data[id-1].main_email : req.param('main_email'),
      type : req.param('type') === undefined ? self.data[id-1].type : req.param('type'),
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
    this.data[Number(req.params.id) - 1].status = 0;
    const data = this.data.find(el => el.id === Number(req.params.id));
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new userCtrl();
