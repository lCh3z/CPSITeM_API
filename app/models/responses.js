/**
 ** @classdesc Class model of responses.contains methods suchexists
 * create, delete, update.
 * @version 16/10/2018
 * @return error
 */
class Responses {
  static notFound(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `No items found in ${table}` },
    };
    return error;
  }

  /**
   ** @classdesc Function that creates a table in the database.
   * Verify the result first
   * @version 16/10/2018
   * @return error
   */
  static created(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Successful registration of ${table} element` },
    };
    return error;
  }
  /**
   ** @classdesc Function that validates the creation of record in the table of the database
   * Verify the result first
   * @version 16/10/2018
   * @return error
   */
  static cantCreate(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Impossible to register ${table} element` },
    };
    return error;
  }

  /**
   ** @classdesc Function that validates the update of record in the table of the database
   * Verify the result first
   * @version 16/10/2018
   * @return error
   */
  static updated(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Successful update ${table} element` },
    };
    return error;
  }

  /**
   ** @classdesc Function that validates the update of record in the table of the database
   * Verify the result first
   * @version 16/10/2018
   * @return error
   */
  static cantUpdate(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Impossible to update ${table} element` },
    };
    return error;
  }

  /**
   ** @classdesc Function that validates the delete of record in the table of the database
   * Verify the result first
   * @version 16/10/2018
   * @return error
   */
  static deleted(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Successful deleted ${table} element` },
    };
    return error;
  }

  /**
   ** @classdesc Function that validates the delet of record in the table of the database
   * Verify the result first
   * @version 16/10/2018
   * @return error
   */
  static cantDelete(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Impossible to delete ${table} element'` },
    };
    return error;
  }
}
module.exports = Responses;
