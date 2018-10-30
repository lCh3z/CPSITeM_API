const nodemailer = require('nodemailer');

/**
 * @classdesc Class of index mail, used to send emails to the users, contain
 *            transporter initialize with a nodemailer creator of transport,
 *            mailOptions initialize with email of the proyect, sendMail like a
 *            function
 * @version   29/10/2018
 */

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

/**
 * Function to send a mail to some user, recived options and join with this.mailOptions
 * for finally send the mail used the transporter
 *
 * @param   {Object}       options    Options Within the him include the data of to who,
 *                                    subject with text, text and one format in html with characteristics
 * @return  {Error Object,Bool}       In case of error or true
 * @version 29/10/2018
 */
  sendMail(options){
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
        return true;
    });
  }
}

module.exports = new Mailer();
