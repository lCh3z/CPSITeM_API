function errorHandler (err, req, res, next) {
  console.log('Error handler');
  if (err) {
    console.log('Ther is an error', err);
    res.status(err.status || 500).send(err);
  }
}

module.exports = errorHandler;
