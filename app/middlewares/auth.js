class Auth{
  register(req, res){
    console.log('in the middleware');
  }
}

module.exports = new Auth();
