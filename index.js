  nodemailer = require('nodemailer')

module.exports = {
  transporters : {},
  expand : function( module ){
    this.transporters[module.name] = nodemailer.createTransport( module.mail )
  },
  send : function( mailOptions){
    var root = this
    return new Promise(function( resolve, reject){

      root.transporters[root.relier].sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
          reject()
        }else{
          console.log('Message sent: ' + info.response);
          resolve(info)
        }
      });
    })
  }
}