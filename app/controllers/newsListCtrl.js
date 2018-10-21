const db = require('../db');
const { NewsListMdl } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado
// FIXME Los mensajes de respuestas deberian estar en ingles y  usar los responses que armaron

class newsListCtrl{
  constructor(){
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getAll = this.getAll.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new NewsListMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_NewsList_', ['email', 'status'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newList = new NewsListMdl(req.body);

    const result = await newList.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const newList = new NewsListMdl(req.body);
    newList.id = req.param('id');

    const result = await newList.save();

    // FIXME Evitar codigos numericos que no son claros
    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }
}

module.exports = new newsListCtrl();
