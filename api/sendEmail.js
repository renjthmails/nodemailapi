
const sendGridClient  = require('./../services/sendGridClient');
const dummyClient  = require('./../services/dummyClient');
var providers = [sendGridClient, dummyClient];

var sendEmail = {
    send(res, args, i){
          var result = providers[i].sendEmail(args);       
          result.then((res1) => 
          {
            console.log("emailClient Send: " + res1);
            res.send(`Send via ${providers[i].constructor.name}`);            
          }, 
          (err) => {                      
              console.log("emailClient Send: " + err); 
              if(i < providers.length){                 
                this.send(res, args, ++i);  
              }
              else{
                 res.send('Sending failed with all provider');
              }       
          });   
    }
}

module.exports = sendEmail;