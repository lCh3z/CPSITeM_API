class serviceCtrl{
  constructor(){
    this.data = [{

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

  }
  create(req, res){

  }
  update(req, res){

  }
  delete(req, res){

  }
}

module.exports = new serviceCtrl();
