const db = require('../db');
const { ConfSectionMdl } = require('../models');

class confSectionCtrl{
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
      result.push(new ConfSectionMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_ConfSection_', ['id_section', 'photo', 'title', 'subtitle', 'type', 'description'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res){
    let data = await db.get('_ConfSection_', ['id_section', 'photo', 'title', 'subtitle', 'type', 'description'], [{ attr: 'id_section', oper: '=', val: Number(req.param('id_section')) }]);
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(404).send({ error: 'No se encontró el elemento solicitado' });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newConfSection = new ConfSectionMdl(req.body);

    const result = await newConfSection.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const ConfSection = new ConfSectionMdl(req.body);
    ConfSection.id_section = req.param('id_section');

    const result = await ConfSection.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res){
    const ConfSection = new ConfSectionMdl({
      id_section: Number(req.param('id_section')),
    });

    const result = await ConfSection.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new confSectionCtrl();
