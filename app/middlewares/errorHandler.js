function errorHandler(err, req, res, next) {
  if (err) {
    console.log('There is an error\n', err, '\n');
    res.status(err.status || 500).send(err);
  }
}

module.exports = errorHandler;
