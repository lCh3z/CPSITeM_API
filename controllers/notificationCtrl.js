const db = require('../db');
const { NotificationMdl } = require('../models');

class notificationCtrl{
  constructor(){
    this.id_section = args.id_section;
    this.photo = args.photo;
    this.title = args.title;
    this.subtitle = args.subtitle;
    this.type = args.type;
    this.description = args.description;
  }
  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new NotificationMdl(res));
    });
    return result;
  }

  async getAll(req, res){
    let data = await db.getAll('_Notification_', ['id', 'title', 'cont', 'id_user', 'date', 'prog', 'status'], '', '', '');
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ response: 'OK', data: [{ message: 'No existen elementos que cumplan con lo solicitado' }], });
    } else {
      res.status(200).send({ data });
    }
  }

  async create(req, res){
    const newNotification = new NotificationMdl(req.body);

    const result = await newNotification.save();

    if(result === 0){
      res.status(201).send({ message: 'Registrado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo registrar' });
    }
  }
  async update(req, res){
    const Notification = new NotificationMdl(req.body);
    Notification.id_user   = req.param('id_user');

    const result = await Notification.save();

    if(result === 0){
      res.status(200).send({ message: 'Actualizado correctamente' });
    } else if (result === 1) {
      res.status(201).send({ message: 'Registrado correctamente'});
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a actualizar' });
    }
  }

  async delete(req, res){
    const Notification = new NotificationMdl({
      id_user  : Number(req.param('id_user')),
    });

    const result = await Notification.delete();

    if(result === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (result === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (result === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new notificationCtrl();
