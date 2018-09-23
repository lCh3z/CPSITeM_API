const mysql = require('mysql');

class DB {
  constructor() {
    this.con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.con.connect();
  }

  getAll(table, columns, filters, order, limit) {
    return new Promise((resolve, reject) => {
      let base = 'SELECT ?? FROM ?? ';
      let extra = '';
      const adds = [columns, table];
      if (filters) {
        filters.forEach((i, index) => {
          if (index !== 0) extra += `${i.logic} `;
          extra += `${this.con.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} `;
          if (i.oper === 'LIKE') extra += `'%${this.con.escape(i.val).replace('\'', '').replace('\'', '')}%' `; else extra += `${this.con.escape(i.val)} `;
        });
      }
      if (filters) { base += `WHERE ${extra} `; }
      if (order) {
        base += `ORDER BY ${this.con.escapeId(order.by)} `;
        if (order.asc) base += 'ASC '; else base += 'DESC ';
      }
      if (limit) base += `Limit ${this.con.escape(limit.start)}, ${limit.quant} `;
      base += ';';
      this.con.query(base, adds, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  get(table, columns, filters) {
    return new Promise((resolve, reject) => {
      let base = 'SELECT ?? FROM ?? ';
      let extra = '';
      const adds = [columns, table];
      filters.forEach((i, index) => {
        if (index !== 0) extra += `${i.logic} `;
        extra += `${this.con.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') extra += `'%${this.con.escape(i.val).replace('\'', '').replace('\'', '')}%' `; else extra += `${this.con.escape(i.val)} `;
      });
      base += `WHERE ${extra} ;`;
      this.con.query(base, adds, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  create(table, post) {
    return new Promise((resolve, reject) => {
      this.con.query('INSERT INTO ?? SET ?;', [table, post], (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  update(table, post, filters) {
    return new Promise((resolve, reject) => {
      let base = 'UPDATE ?? SET ? ';
      let extra = '';
      console.log(post);
      const adds = [table, post];
      filters.forEach((i, index) => {
        if (index !== 0) extra += `${i.logic} `;
        extra += `${this.con.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} ${this.con.escape(i.val)} `;
      });
      base += `WHERE ${extra} ;`;
      console.log(base);
      this.con.query(base, adds, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  delete(table, filters) {
    return new Promise((resolve, reject) => {
      let base = 'DELETE FROM ?? ';
      let extra = '';
      filters.forEach((i, index) => {
        if (index !== 0) extra += `${i.logic} `;
        extra += `${this.con.escapeId(i.attr).replace('`', '').replace('`', '')} ${i.oper} ${this.con.escape(i.val)} `;
      });
      base += `WHERE ${extra} ;`;
      console.log(base);
      this.con.query(base, table, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  destructor() {
    this.con.end();
  }
}

module.exports = new DB();
