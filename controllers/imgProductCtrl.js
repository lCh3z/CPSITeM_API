const db = require('../db');
const { ImgProductMdl } = require('../models');

class imgProductCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ImgProductMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_ImgProduct_', ['id_prod', 'photo'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res){
    let data = await db.get('_ImgProduct_', ['id_prod', 'photo'], [{ attr: 'id_prod', oper: '=', val: Number(req.param('id_prod')) }]);
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(404).send({ error: 'No se encontró el elemento solicitado' });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newimgproduct = new ImgProductMdl(req.body);

    const result = await newimgproduct.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const imgproduct = new ImgProductMdl(req.body);
    imgproduct.id_prod = req.param('id_prod');

    const result = await imgproduct.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res){
    const imgproduct = new ImgProductMdl({
      id_prod: Number(req.param('id_prod')),
    });

    const result = await imgproduct.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new imgProductCtrl();
