class addressCtrl{
  constructor(){
    this.data = [{
      id :1,
      id_client :1,
      name : 'Ulises',
      street : 'Colon',
      colony : 'Parques',
      city : 'gdl',
      state : 'Jalisco',
      date : '2018-9-20',
      out_num : 4684,
      int_num : 1,
      zip_code : '1234',
      phone : '3322110099',
      email : 'email1@gmail.com',
    },
    {
      id :2,
      id_client :2,
      name : 'Marcos',
      street : 'Colon',
      colony : 'Parques',
      city : 'gdl',
      state : 'Jalisco',
      date : '2018-9-20',
      out_num : 4685,
      int_num : 2,
      zip_code : '1234',
      phone : '3322110099',
      email : 'email2@gmail.com',
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
    const lastId = this.data[this.data.length - 1].id;
    const data = {
      id : lastId +1;
      id_client : req.param('id_client'),
      name : req.param('name'),
      street : req.param('street'),
      colony : req.param('colony'),
      city : req.param('city'),
      state : req.param('state'),
      date : req.param('date'),
      out_num : req.param('out_num'),
      int_num : req.param('int_num'),
      zip_code : req.param('zip_code'),
      phone : req.param('phone'),
      email : req.param('email'),
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
      id_client : req.param('id_client') === undefined ? self.data[id-1].id_client : req.param('id_client'),
      name : req.param('name') === undefined ? self.data[id-1].name : req.param('name'),
      street : req.param('street') === undefined ? self.data[id-1].street : req.param('street'),
      colony : req.param('colony') === undefined ? self.data[id-1].colony : req.param('colony'),
      city : req.param('city') === undefined ? self.data[id-1].city : req.param('city'),
      state : req.param('state') === undefined ? self.data[id-1].state : req.param('state'),
      date : req.param('date') === undefined ? self.data[id-1].date : req.param('date'),
      out_num : req.param('out_num') === undefined ? self.data[id-1].out_num : req.param('out_num'),
      int_num : req.param('int_num') === undefined ? self.data[id-1].int_num : req.param('int_num'),
      zip_code : req.param('zip_code') === undefined ? self.data[id-1].zip_code : req.param('zip_code'),
      phone : req.param('phone') === undefined ? self.data[id-1].phone : req.param('phone'),
      email : req.param('email') === undefined ? self.data[id-1].email : req.param('email'),
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
      response : 'OK';
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new addressCtrl();
