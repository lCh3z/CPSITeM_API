class Response {
  constructor() {
    this.title = 'Internal server error';
    this.status = 500;
    this.details = null;
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
    if (!this.detail) {
      this.detail = {};
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }

  notFound(table, plus) {
    return this.setDetail(table, 'Not items found', plus);
  }

  registered(table, plus) {
    return this.setDetail(table, 'Successful registration', plus);
  }

  cantRegister(table, plus) {
    return this.setDetail(table, 'Could not register', plus);
  }

  updated(table, plus) {
    this.setDetail(table, 'Successful update', plus);
  }

  cantUpdate(table, plus) {
    return this.setDetail(table, 'Could not update', plus);
  }

  deleted(table, plus) {
    return this.setDetail(table, 'Successful deletion', plus);
  }

  cantDelete(table, plus) {
    return this.setDetail(table, 'Could not delete', plus);
  }
}

module.exports = Response;
