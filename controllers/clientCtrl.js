class clientCtrl{
  constructor(){
    this.data = [{
      id :1,
      name : 'Diego',
      photo : 'foto.jpeg',
      sec_name : 'Luis',
      pat_surname : 'Quiñones',
      mat_surname : 'Guzmna',
      company : 'CocaCola',
      rfc : 'QUDL850321AD2',
      cfdi : 'archivo.xml',
      phone : 3387284657,
      business_name : 'LOS sanos',
      status : 1,
      list_email : [
        'sanoDiego@gmail.com ',
        'otro@hotmail.com',
      ],
      cdu : 'diego123',
      main_email : 'sanodiego@gmail.com',
    },
    {
      id :2,
      name : 'Diego',
      photo : 'foto.jpeg',
      sec_name : 'Luis',
      pat_surname : 'Quiñones',
      mat_surname : 'Guzmna',
      company : 'CocaCola',
      rfc : 'QUDL850321AD2',
      cfdi : 'archivo.xml',
      phone : 3387284657,
      business_name : 'LOS sanos',
      status : 1,
      list_email : [
        'sanoDiego@gmail.com ',
        'otro@hotmail.com',
      ],
      cdu : 'diego123',
      main_email : 'sanodiego@gmail.com',
    },
  ];
  this.getAll = this.getAll.bind(this);
  this.get = this.get.bind(this);
  this.create = this.create.bind(this);
  this.update = this.update.bind(this);
  this.delete = this.delete.bind(this);
  }

  getAll(req, res) {
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
      name : req.param('name'),
      photo : req.param('photo'),
      sec_name : req.param('sec_name'),
      pat_surname : req.param('mat_surname'),
      mat_surname : req.param('mat_surname'),
      company : req.param('company'),
      rfc : req.param('rfc'),
      cfdi : req.param('cfdi'),
      phone : req.param('phone'),
      business_name : req.param('business_name'),
      status : req.param('status'),
      list_email : req.param('list_email'),
      cdu : req.param('cdu'),
      main_email : req.param('main_email')
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
      id : req.param('id'),
      name : req.param('name') === undefined ? self.data[id-1].name : req.param('name'),
      photo : req.param('photo') === undefined ? self.data[id-1].photo : req.param('photo'),
      sec_name : req.param('sec_name') === undefined ? self.data[id-1].sec_name : req.param('sec_name'),
      pat_surname : req.param('mat_surname') === undefined ? self.data[id-1].pat_surname : req.param('pat_surname'),
      mat_surname : req.param('mat_surname') === undefined ? self.data[id-1].mat_surname : req.param('mat_surname'),
      company : req.param('company') === undefined ? self.data[id-1].company : req.param('company'),
      rfc : req.param('rfc') === undefined ? self.data[id-1].rfc : req.param('rfc'),
      cfdi : req.param('cfdi') === undefined ? self.data[id-1].cfdi : req.param('cfdi'),
      phone : req.param('phone') === undefined ? self.data[id-1].phone : req.param('phone'),
      business_name : req.param('business_name') === undefined ? self.data[id-1].business_name : req.param('business_name'),
      status : req.param('status') === undefined ? self.data[id-1].status : req.param('status'),
      list_email : req.param('list_email') === undefined ? self.data[id-1].list_email: req.param('list_email'),
      cdu : req.param('cdu') === undefined ? self.data[id-1].cdu : req.param('cdu'),
      main_email : req.param('main_email') === undefined ? self.data[id-1].main_email : req.param('main_email'),
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
module.exports = new clientCtrl();
