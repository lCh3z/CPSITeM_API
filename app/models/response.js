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

  notFound(table, plus) {
    let detail = 'Not items found';
    if (plus) {
      detail += `: ${plus}`;
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }

  registered(table, plus) {
    let detail = 'Successful registration';
    if (plus) {
      detail += `: ${plus}`;
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }

  cantRegister(table, plus) {
    let detail = 'Could not register';
    if (plus) {
      detail += `: ${plus}`;
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }

  updated(table, plus) {
    let detail = 'Successful update';
    if (plus) {
      detail += `: ${plus}`;
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }

  cantUpdate(table, plus) {
    let detail = 'Could not update';
    if (plus) {
      detail += `: ${plus}`;
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }

  deleted(table, plus) {
    let detail = 'Successful deletion';
    if (plus) {
      detail += `: ${plus}`;
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }

  cantDelete(table, plus) {
    let detail = 'Could not delete';
    if (plus) {
      detail += `: ${plus}`;
    }
    if (!this.details[table]) {
      this.details[table] = [detail];
    } else {
      this.details[table].push(detail);
    }
    return this;
  }
}

module.exports = Response;
