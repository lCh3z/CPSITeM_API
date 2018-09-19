class cartCtrl{
  constructor(){
    this.data = [{

    }];
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

  }
  update(req, res){

  }
  delete(req, res){

  }
}

module.exports = new cartCtrl();
