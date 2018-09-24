
module.exports = function addDate(req, res, next) {
  if(req.body.date = Date.now())
    next();
  return next({message: "No pudimos obtener la fecha y hora actual."})
}
