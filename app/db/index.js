const mysql = require('mysql');
const Response = require('../models/response');

/**
 * @classdesc Class of DateBase, contain the host, port, user, password, database
 *            initialize from the environment, all in the connection, the functions
 *            select, create, update, delete, count, disconnect and all are initialize
 *            with his '.bind', also connects the connection of data base. Including
 *            other functions as max, destroy, formatFilters, formatOrder, formatLimit,
 *            processError and getDataFromErrorMsg
 * @version   15/10/2018
 */
class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
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
    this.processError = this.processError.bind(this);
    this.getDataFromErrorMsg = this.getDataFromErrorMsg.bind(this);
    this.formatLimit = this.formatLimit.bind(this);
    this.formatOrder = this.formatOrder.bind(this);
    this.formatFilters = this.formatFilters.bind(this);
    this.destroy = this.destroy.bind(this);
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting', err.stack);
        throw err;
      }
    });
  }

  /**
   * Function to get the maximum from a Database table and his the filter to apply.
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
   * @return {Promise}                Promise to return the query results after database response
   */
  max(table, column, filters) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT MAX(${this.connection.escapeId(column).replace(/`/g, '')}) as max FROM ?? ${this.formatFilters(filters)};`;
      this.connection.query(sql, table, (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  /**
   * Function to get the count from a Database table and his the filter to apply.
   * @param  {String}         table   Required name of the database table. 'User'
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
   * @return {Promise}                Promise to return the query results after database response
   */
  count(table, filters) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) as count FROM ?? ${this.formatFilters(filters)};`;
      this.connection.query(sql, table, (error, rows) => {
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
   *             Descendent order ->    desc: false,
   *                                  }
   *                                  *** If you put desc as false or just omit that
   *                                  the order will be ascendent ***
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
      const sql = `SELECT ?? FROM ?? ${this.formatFilters(filters)} ${this.formatOrder(order)} ${this.formatLimit(limit)};`;
      this.connection.query(sql, [columns, table], (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  create(table, post) {
    delete post.date;
    delete post.updated;
    delete post.id;
    if (!post.satatus) post.status = 1;
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO ?? SET ?;', [table, post], (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  update(table, post, filters) {
    delete post.date;
    delete post.updated;
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ?? SET ? ${this.formatFilters(filters)};`;
      this.connection.query(sql, [table, post], (error, rows) => {
        if (error) return reject(this.processError(error));
        return resolve(rows);
      });
    });
  }

  delete(table, post, filters) {
    delete post.date;
    delete post.updated;
    post.status = 0;
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ?? SET ? ${this.formatFilters(filters)};`;
      this.connection.query(sql, [table, post], (error, rows) => {
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

  formatFilters(filters) {
    let result = ' ';
    if (filters) {
      filters.forEach((filter, index) => {
        if (index !== 0) result += `${filter.logic} `;
        result += `${this.connection.escapeId(filter.attr).replace(/`/g, '')} ${filter.oper} `;
        if (filter.oper === 'LIKE') {
          result += `'%${this.connection.escape(filter.val).replace(/'/g, '')}%' `;
        } else {
          result += `${this.connection.escape(filter.val)} `;
        }
      });
      result = `WHERE ${result} `;
    }
    return result;
  }

  formatOrder(order) {
    let result = ' ';
    if (order) {
      result += `ORDER BY ${this.connection.escapeId(order.by)} `;
      if (order.desc) {
        result += 'DESC ';
      } else {
        result += 'ASC ';
      }
    }
    return result;
  }

  formatLimit(limit) {
    let result = ' ';
    if (limit) {
      result += `LIMIT ${this.connection.escape(limit.start)}, ${limit.quant} `;
    }
    return result;
  }

  processError(err) {
    const response = new Response();
    response.bad()
      .setStatus(409);
    const data = this.getDataFromErrorMsg(err.sqlMessage);
    switch (err.code) {
    case 'ER_DUP_ENTRY':
      response.setDetail(data[1].replace(/'/g, ''), `${data[0]} already exists on the system`);
      break;
    default:
      response.setDetail('Unhandled exception', err.sqlMessage);
      break;
    }

    return response;
  }

  getDataFromErrorMsg(message) {
    const data = unescape(message).match(/'([^']+)'/g);
    if (data) {
      return data;
    } else {
      return [];
    }
  }
}

module.exports = new DB();
