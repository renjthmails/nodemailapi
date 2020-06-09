var express = require('express');
const sendEmail = require('./api/sendEmail');
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

      sendEmail.send(res, args, 0);          
          
      }      
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


