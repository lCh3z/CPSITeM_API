const nodemailer = require('nodemailer');

class Mailer {
  constructor(){
    this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    this.mailOptions = {
      from: '"CPSITeM" <CPSITeM@gmail.com>',
    };
    //Validar el transporter, delete in case of unused
    // this.transporter.verify()
  }

  sendMail(options){
    console.log('Correo');

    let mailOptions = {
      ...this.mailOptions,
      ...options,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }
}

module.exports = new Mailer();
