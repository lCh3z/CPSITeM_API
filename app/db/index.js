const mysql = require('mysql');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    this.select = this.select.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.count = this.count.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.connection.connect((err) => {
      if (err) {
        console.error('error connecting', err.stack);
        throw err;
      }
    });
  }

  max(table, column, filters) {
    return new Promise((resolve, reject) => {
      let base = `SELECT MAX(${this.connection.escapeId(column).replace('`', '').replace('`', '')}) as max FROM ?? `;
      let extra = '';
      if (filters) {
        filters.forEach((i, index) => {
          if (index !== 0) extra += `${i.logic} `;
          extra += `${this.connection.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} `;
          if (i.oper === 'LIKE') extra += `'%${this.connection.escape(i.val).replace('\'', '').replace('\'', '')}%' `; else extra += `${this.connection.escape(i.val)} `;
        });
      }
      if (filters) { base += `WHERE ${extra} `; }
      base += ';';
      this.connection.query(base, table, (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  count(table, filters) {
    return new Promise((resolve, reject) => {
      let base = 'SELECT COUNT(*) as count FROM ?? ';
      let extra = '';
      if (filters) {
        filters.forEach((i, index) => {
          if (index !== 0) extra += `${i.logic} `;
          extra += `${this.connection.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} `;
          if (i.oper === 'LIKE') extra += `'%${this.connection.escape(i.val).replace('\'', '').replace('\'', '')}%' `; else extra += `${this.connection.escape(i.val)} `;
        });
      }
      if (filters) { base += `WHERE ${extra} `; }
      base += ';';
      this.connection.query(base, table, (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  /**
   * Function to get a single or multiple rows from a Database table, coulding specify
   * the columns that you want, the filter to apply, order type and a limit.
   * @param  {String}         table   Required name of the database table. 'User'
   *
   * @param  {Array.<string>} columns Required of column names to get.  ['id', 'name']
   *
   * @param  {Array.<object>} filters Nullable list of filter objects to use.
   *                        Array ->  [
   *                Filter object ->    {
   *                Column to use ->      attr: 'name',
   *          Comparing operation ->      oper: '=',
   *             Value to compare ->      val: this.name,
   *                                    },
   *                                    {
   *                 Logic to use ->      logic: 'and',
   *                Column to use ->      attr: 'age',
   *          Comparing operation ->      oper: '>=',
   *             Value to compare ->      val: 18,
   *                                    },
   *                                  ]
   *                                  *** Except fot the first object, you need to
   *                                  include the logic attribute ***
   *
   * @param  {Object}         order   Nullable definition of ORDER params
   *                                  {
   *                Column to use ->    by: 'age',
   *              Ascendent order ->    asc: false,
   *                                  }
   *                                  *** If you put asc as false, the order will be
   *                                  descendent ***
   *
   * @param  {Object}         limit   Nullable definition of LIMIT params
   *                                  {
   *             Initial position ->    start: 10,
   *                Rows quantity ->    quant: 25,
   *                                  }
   *
   * @return {Promise}                Promise to return the query results after database response
   */
  select(table, columns, filters, order, limit) {
    return new Promise((resolve, reject) => {
      let base = 'SELECT ?? FROM ?? ';
      let extra = '';
      const adds = [columns, table];
      if (filters) {
        filters.forEach((i, index) => {
          if (index !== 0) extra += `${i.logic} `;
          extra += `${this.connection.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} `;
          if (i.oper === 'LIKE') extra += `'%${this.connection.escape(i.val).replace('\'', '').replace('\'', '')}%' `; else extra += `${this.connection.escape(i.val)} `;
        });
      }
      if (filters) { base += `WHERE ${extra} `; }
      if (order) {
        base += `ORDER BY ${this.connection.escapeId(order.by)} `;
        if (order.asc) base += 'ASC '; else base += 'DESC ';
      }
      if (limit) base += `LIMIT ${this.connection.escape(limit.start)}, ${limit.quant} `;
      base += ';';
      this.connection.query(base, adds, (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  create(table, post) {
    if (!post.satatus) post.status = 1;
    post.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    post.updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO ?? SET ?;', [table, post], (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  update(table, post, filters) {
    delete post.date;
    post.updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return new Promise((resolve, reject) => {
      let base = 'UPDATE ?? SET ? ';
      let extra = '';
      const adds = [table, post];
      filters.forEach((i, index) => {
        if (index !== 0) extra += `${i.logic} `;
        extra += `${this.connection.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} ${this.connection.escape(i.val)} `;
      });
      base += `WHERE ${extra} ;`;
      this.connection.query(base, adds, (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  delete(table, post, filters) {
    delete post.date;
    post.status = 0;
    post.updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return new Promise((resolve, reject) => {
      let base = 'UPDATE ?? SET ? ';
      let extra = '';
      const adds = [table, post];
      filters.forEach((i, index) => {
        if (index !== 0) extra += `${i.logic} `;
        extra += `${this.connection.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} ${this.connection.escape(i.val)} `;
      });
      base += `WHERE ${extra} ;`;
      this.connection.query(base, adds, (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  disconnect() {
    this.connection.end();
  }

  destroy() {
    this.connection.destroy();
  }

  processError(err) {
    const error = {};
    const data = this.getDataFromErrorMsg(err.sqlMessage);
    switch (err.code) {
      case 'ER_DUP_ENTRY':
        error['duplicated'] = {
          message: `The ${data.field} ${data.data} already exists on the system`,
          field: data.field,
        };
        break;
      default:
        error['BAD'] = {
          message: `The ${data.field} ${data.data} already exists on the system`,
          field: data.field,
        };
        break;
    }

    return error;
  }

  getDataFromErrorMsg(message) {
    let data = unescape(message).match(/'([^']+)'/g)
    return {
      field: data[1].slice(1,-1),
      data: data[0].slice(1,-1),
    }
  }
}

module.exports = new DB();
