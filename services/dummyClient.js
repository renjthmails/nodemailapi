const emailClient = require('./emailClient');

class dummyClient extends emailClient
{
    constructor()
    {
        super();       
    }
    sendEmail() {              
        return new Promise(function(resolve, reject) {
            resolve(true);
            reject(false);
          });       
    }
}

module.exports =  new dummyClient();