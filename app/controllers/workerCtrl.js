const db = require('../db');
const { WorkerMdl } = require('../models');

class workerCtrl {
  constructor() {
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new WorkerMdl(res));
    });
    return result;
  }

  async get(inputs, next) {
    try {
      let data = await WorkerMdl.select(
        '_Worker_',
        [
          'position',
          'depart',
          'status',
          'date',
          'updated',
        ],
        [
          {
            attr: 'id_user',
            oper: '=',
            val: inputs.id_user,
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
      return this.processResult(data)[0];
    } catch (e) {
      next(e);
    }
  }

  async create(inputs, next) {
    try {
      const newWorker = new WorkerMdl(inputs);
      const result = await newWorker.save();
      return result;
    } catch (e) {
      next(e);
    }
  }

  async update(inputs, next) {
    try {
      const Worker = new WorkerMdl(inputs);
      const result = await Worker.save();
      return result;
    } catch (e) {
      next(e);
    }
  }

  async delete(inputs, next) {
   try {
     input.status = 0;
     const Worker = new WorkerMdl(inputs);
     const result = await Worker.delete();
     return result;
   } catch (e) {
     next(e);
   }
  }
}

module.exports = new workerCtrl();
