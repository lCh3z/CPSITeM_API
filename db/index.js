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

  query() {

  }

  getAll(table) {
    return new Promise( ( resolve, reject ) => {
      this.con.query(`SELECT * FROM ${table};`, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  get(table, id) {
    return new Promise( ( resolve, reject ) => {
      this.con.query(`SELECT * FROM ${table} where id=${id};`, ( err, rows ) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  create(table, object) {
    return new Promise( ( resolve, reject ) => {
      this.con.query(`INSERT INTO ${table} (name) values("${object.name}");`, ( err, rows ) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  update(table, object) {
    return new Promise( ( resolve, reject ) => {
      this.con.query(`UPDATE ${table} set name = "${object.name}" where id=${object.id};`, ( err, rows ) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  delete(table, object) {
    return new Promise( ( resolve, reject ) => {
      this.con.query(`DELETE FROM ${table} where id=${object.id};`, ( err, rows ) => {
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
