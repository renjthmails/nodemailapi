var express = require('express');
const sendGridClient  = require('./services/sendGridClient');
const dummyClient  = require('./services/dummyClient');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => { 
  res.send('Use /sendemail api to send email');
});

app.get('/sendemail', (req, res) => {  
    if(req.path === '/sendemail'){
    const args = {
        from: 'renjithmails@gmail.com',
        to: req.query.to,
        subject: req.query.subject,
        body: req.query.body,
        html: req.query.html
      };
      var result = sendGridClient.sendEmail(args);   
      
      result.then((res1) => 
      {
        console.log("sendGridClient Send: " + res1);
        res.send(`Send via sendGrid ${res1[0]}`);
      }, 
      (err) => {                      
      console.log("sendGridClient Send: " + err);
      dummyClient.sendEmail(args)
                .then((res1) => 
                {
                  console.log("dummyClient Send: " + res1);
                  res.send('Send via dummyClient');
                },
                  (err1) => 
                  {
                    console.log("dummyClient Send: " + err1)
                    res.send('Sending failed');
                  })
              }
        );         
      }      
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


