class cupponCtrl{
  constructor(){
    this.data = [{
      id: 'XMAS',
      discount: 10,
      start: Date.now(),
      end: Date.now(),
      description: 'descripcion',
    },{
      id: 'XMAS2',
      discount: 10,
      start: Date.now(),
      end: Date.now(),
      description: 'Descripcion2'
    }];
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
    const data = this.data.find(el => el.id === req.params.id);
    const json = {
      response : 'OK',
      data : data
    };
    res.send(json);
  }
  create(req, res){
  const data = {
      id: req.param('id'),
      discount: req.param('discount'),
      start: req.param('start'),
      end: req.param('end'),
      description: req.param('description'),
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
    let id = req.params.id;
    let data = this.data.find(el => el.id === id);
    data = {
      id: req.param('id'),
      discount: req.param('discount') === undefined ? self.data[id-1].discount : req.param('discount'),
      start: req.param('start') === undefined ? self.data[id-1].start : req.param('start'),
      end: req.param('end') === undefined ? self.data[id-1].end : req.param('end'),
      description: req.param('description') === undefined ? self.data[id-1].description : req.param('description'),
    };
    this.data[this.data.indexOf(req.params.id)] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);

  }
  delete(req, res){
    const data = this.data.find(el => el.id === req.params.id);
    this.data[this.data.indexOf(data)].end = 0;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new cupponCtrl();
