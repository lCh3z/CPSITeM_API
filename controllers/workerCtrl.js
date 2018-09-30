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

  async get(inputs) {
    console.log('id', inputs.id_user);
    let data = await WorkerMdl.select(
      '_Worker_',
      [
        'position',
        'depart',
      ],
      [
        {
          attr: 'id_user',
          oper: '=',
          val: inputs.id_user,
        },
      ],
      null,
      null,
    );

    console.log('D', data);
    return this.processResult(data);
  }

  async create(inputs) {
    const newWorker = new WorkerMdl(inputs);
    const result = await newWorker.save();
    return result;
  }

  async update(inputs) {
    const Worker = new WorkerMdl(inputs);
    const result = await Worker.save();
    return result;
  }

  async delete(inputs) {
    const Worker = new WorkerMdl({
      id_user: Number(inputs.id_user),
    });
    const result = await Worker.delete();
    return result;
  }
}

module.exports = new workerCtrl();
