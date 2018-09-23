const db = require('../db');

class ClientMdl {
  constructor(args) {
    this.id = args.id;
    this.photo = args.photo;
    this.name = args.name;
    this.sec_name = args.sec_name;
    this.pat_surname = args.pat_surname;
    this.mat_surname = args.mat_surname;
    this.company = args.company;
    this.rfc = args.rfc;
    this.cfdi = args.cfdi;
    this.phone = args.phone;
    this.phone = args.phone;
    this.status = args.status;
    this.cdu = args.cdu;
    this.main_email = args.main_email;
  }

  async save() {
    if (this.id !== undefined && await db.get('_Client_', 'id', [{ attr: 'id', oper: '=', val: this.id }])) return this.update();
    if (await db.create('_Client_', this)) return { message: 'Registrado correctamente' };
    return { error: 'No se pudo registrar' };
  }

  async update() {
    if (this.id !== undefined && await db.update('_Client_', this, [{ attr: 'id', oper: '=', val: this.id }])) return { message: 'Actualizado correctamente' };
    return { error: 'No se pudo actualizar' };
  }

  async delete() {
    if (this.id !== undefined && await db.get('_Client_', 'id', [{ attr: 'id', oper: '=', val: this.id }])) {
      if (this.id !== undefined && await db.delete('_Client_', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return { message: 'Eliminado con éxito' };
      return { error: 'No se pudo eliminar' };
    }
    return { error: 'No Existe el elemento' };
  }
}

module.exports = ClientMdl;
