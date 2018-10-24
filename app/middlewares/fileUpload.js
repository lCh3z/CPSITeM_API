const bcrypt = require('bcrypt-nodejs');
class fileUpload {
  constructor() {
    this.upload = this.upload.bind(this);
  }

  async upload(req, res, next, type) {
    let id = req.params.id;
    if(!req.files){
      return res.status(400)
      .json({
        ok: false,
        err:{
          message:'No file selected'
        }
      });
    }
    let file = req.files.file;
    let partialName = file.mimetype.split('/');
    let extension = partialName[partialName.length - 1];
    let extensions = ['png', 'jpg', 'gif', 'jpeg', 'xml', 'pdf', 'msword'];
    if(extensions.indexOf( extension ) < 0 ){
      return res.status(400).json({
        ok: false,
        err:{
          message: 'Valid extensions are: ' + extensions.join(', '),
          ext: extension
        }
      });
    }
    const fileName = `${bcrypt.hashSync(new Date()).split('$')[3].replace(/\//g, '')}.${extension}`;
    file.mv(`app/uploads/${type}/${fileName}`, (err)=>{
      if(err){
        return res.status(400)
        .json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        message: 'image uploaded'
      });
    });
  }
}

module.exports = fileUpload;
