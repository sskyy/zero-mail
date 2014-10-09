var q= require('q'),
  nodemailer = require('nodemailer')

module.exports = {
  deps : ['config'],
  transporters : {},
  expand : function( module ){
    this.transporters[module.name] = nodemailer.createTransport( module.mail )
  },
  send : function( mailOptions){
    var root = this
    return q.Promise(function( resolve, reject){
//      var mailOptions = {
//        from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
//        to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//        subject: 'Hello ✔', // Subject line
//        text: 'Hello world ✔', // plaintext body
//        html: '<b>Hello world ✔</b>' // html body
//      };

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