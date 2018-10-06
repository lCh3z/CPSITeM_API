const db = require('../db');

class ServiceMdl {
  constructor(
    {
      id,
      id_seller,
      id_user,
      hospital,
      type,
      equipment,
      model,
      serial_,
      location,
      contract,
      description,
      voucher,
      status,
      date,
      updated,
    }
  ) {
    this.id = id;
    this.id_seller = id_seller;
    this.id_user = id_user;
    this.hospital = hospital;
    this.type = type;
    this.equipment = equipment ;
    this.model = model;
    this.serial_ = serial_;
    this.location = location;
    this.contract = contract;
    this.description = description;
    this.voucher = voucher;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      for (const res in data) {
        const Service = new ServiceMdl(data[res])
        response.push(Service);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async count(table, filters) {
    try {
      const data = await db.count(table, filters);
      return data[0].count;
    } catch (e) {
      throw e;
    }
  }

  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Service_',
          [
            'id',
          ],
          [
            {
              attr: 'id',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
        return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }

  async save(stat_service) {
    const exists = await this.exists();
    if (this.id !== undefined && exists.length) {
      return this.update();
    }
    try {
      if (await db.create('_Service_', this)) {
        const id = await db.select(
          '_Service_',
          [
            'id',
          ],
        );
        return id[0].id;
      }
    } catch (e) {
      throw e;
    }
  }

  async update(stat_service) {
    try {
      const id = await db.select(
        '_Service_',
        [
          'id',
        ],
        [
          {
            attr: 'id',
            oper: '=',
            val: this.id,
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
        null,
        null,
      );
      console.log('id', id[0].id);
      if (id[0].id === this.id) {
        delete this.id;
      }
      if (this.id !== undefined && await db.update(
        '_Service_',
        this,
        [
          {
            attr: 'id',
            oper: '=',
            val: this.id,
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
      )) {
        return this.id;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      const exists = await this.exists();
      if (exists.length) {
        if (await db.delete(
          '_Service_',
          exists[0],
          [
            {
              attr: 'id',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        )) return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
}

  module.exports = ServiceMdl;
