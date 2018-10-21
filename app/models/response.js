class Response {
  constructor() {
    this.title = 'Internal server error';
    this.status = 500;
    this.details = {};
    this.data = null
  }

  ok() {
    this.title = 'Successful operation';
    return this;
  }

  bad() {
    this.title = 'Something went wrong';
    return this;
  }

  setStatus(num) {
    this.status = num;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setPlus(attr, value) {
    this[attr] = value;
    return this;
  }

  setDetail(table, det, plus) {
    const detail = plus ? `${det} : ${plus}` : det;
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
  }

  notFound(table, plus) {
    this.setDetail(table, 'Not items found', plus);
    return this;
  }

  registered(table, plus) {
    this.setDetail(table, 'Successful registration', plus);
    return this;
  }

  cantRegister(table, plus) {
    this.setDetail(table, 'Could not register', plus);
    return this;
  }

  updated(table, plus) {
    this.setDetail(table, 'Successful update', plus);
    return this;
  }

  cantUpdate(table, plus) {
    this.setDetail(table, 'Could not update', plus);
    return this;
  }

  deleted(table, plus) {
    this.setDetail(table, 'Successful deletion', plus);
    return this;
  }

  cantDelete(table, plus) {
    this.setDetail(table, 'Could not delete', plus);
    return this;
  }
}

module.exports = Response;
