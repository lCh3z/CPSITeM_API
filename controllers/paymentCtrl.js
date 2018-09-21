class paymentCtrl{
  constructor(){
    this.data = [{
      id_client : 1,
      account : 'cuenta',
      token : 'token',
    },
    {
      id_client : 2,
      account : 'cuentas',
      token : 'token'
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
    const data = this.data.find(el => el.account === req.params.account);
    const json = {
      response : 'OK',
      data : data
    };
    res.send(json);
  }
  create(req, res){
    const data = {
      id_client : req.param('id_client'),
      account : req.param('account'),
      token : req.param('token'),
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
    let id = req.params;
    let data = this.data.find(el => el.account === id.account);
    data = {
      id_client: req.param('id_client') === undefined ? self.data[self.data.indexOf(id)].id_client : req.param('id_client'),
      account: req.param('account') === undefined ? self.data[self.data.indexOf(id)].account : req.param('account'),
      token: req.param('token') === undefined ? self.data[self.data.indexOf(id)].token : req.param('token'),
    };
    this.data[this.data.indexOf(id)] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);

  }
  delete(req, res){
    const data = this.data.find(el => el.account === req.params.account);
    this.data.splice(this.data.indexOf(data), 1);
    const json = {
      response : 'OK';
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new paymentCtrl();
