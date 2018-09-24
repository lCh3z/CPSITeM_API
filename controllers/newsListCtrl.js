class newsListCtrl{
  constructor(){
    this.data = [{
      email : 'new@gmail.com',
      status : 1,
    },
    {
      email : 'new2@gmail.com',
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
    const data = this.data.find(el => el.email === req.params.id);
    const json = {
      response : 'OK',
      data : data
    };
    res.send(json);
  }
  create(req, res){
    const data = {
      email : req.param('email'),
      status : 1,
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
    let data = this.data.find(el => el.email === id.email);
    data = {
      email : req.param('email') === undefined ? self.data[self.data.indexOf(id)].email : req.param('email'),
      status : req.param('status') === undefined ? self.data[self.data.indexOf(id)].status : req.param('status')
    };
    this.data[this.data.indexOf(id)] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
  delete(req, res){
    this.data[this.data.indexOf(req.params)].status = 0;
    const data = this.data.find(el=> el.email === req.params.email);
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);

  }
}

module.exports = new newsListCtrl();
