class sectionCtrl{
  constructor(){
    this.data = [{
      id : 1234, //smallint
      type : 1,//tinyint
      status : 1,//boolean
    },
    {
      id : 1235, //smallint
      type : 1,//tinyint
      status : 1,//boolean
    }
  ];
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
      id : lastId + 1,
      type : req.param('type'),
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
      type : req.param('type') === undefined ? self.data[id-1].type : req.param('type'),
      status : req.param('status') === undefined ? self.data[id-1].status : req.param('status'),
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
      response : 'OK',
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new sectionCtrl();
