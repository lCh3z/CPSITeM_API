const db = require('../db');
const { ListProdMdl } = require('../models');

class listProdCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }


  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new ListProdMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_ListProd_', ['id_order', 'id_product', 'quantity', 'price', 'date'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }
  async create(req, res){
    const newListProd = new ListProdMdl(req.body);

    const result = await newListProd.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const ListProd = new ListProdMdl(req.body);
    ListProd.id_order = req.param('id_order');

    const result = await ListProd.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res){
    const ListProd = new ListProdMdl({
      id_order: Number(req.param('id_order')),
    });

    const result = await ListProd.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new listProdCtrl();
