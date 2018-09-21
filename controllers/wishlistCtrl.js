class wishlistCtrl{
  constructor(){
    this.data = [{
      id_user : 1, //integer
      id_product : 1, //integer
    },
    {
      id_user : 2, //integer
      id_product : 2, //integer
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
  create(req, res){
    const data = {
      id_user: Number(req.param('id_user')),
      id_product: Number(req.param('id_product')),
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
    let id = Number(req.params.id_order);
    let data = this.data.find(el => el.id_order === id);
    data = {
      id_user: req.param('id_user') === undefined ? self.data[id-1].id_user : Number(req.param('id_userr')),
      id_product: req.param('id_product') === undefined ? self.data[id-1].id_product : Number(req.param('id_product')),
    };
    this.data[Number(req.params.id_order) -1] = data;
    const json = {
      response : 'OK',
      data : data
    };
    res.status(201).send(json);

  }
  delete(req, res){
    const data = this.data.find(el => el.id_order === Number(req.params.id_order));
    this.data.splice(this.data.indexOf(data),, 1);
    const json = {
      response : 'OK';
      data : data
    };
    res.status(201).send(json);
  }
}

module.exports = new wishlistCtrl();
