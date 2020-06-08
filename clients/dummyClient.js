

var dummyClient = {    
    sendEmail: function(args) {
        return new Promise(function(resolve, reject) {
            resolve(true);
            reject(false);
          });
    }
}

module.exports =  dummyClient;