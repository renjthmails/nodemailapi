var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const sendGridClient  = require('./clients/sendGridClient');
const dummyClient  = require('./clients/dummyClient');
const app = express();
const port = process.env.PORT || 4000;


var schema = buildSchema(`
  type Query {
    sendEmail(to: String, subject: String, text: String, html: String) : Boolean
  }
`);


var root = { 
    sendEmail: (args) => {
        args.from = 'renjithmails@gmail.com';
        var result = sendGridClient.sendEmail(args);
        return result.then((res) => 
                            {
                              console.log("sendGridClient Send: " + res);
                              return 'Send via sendGrid';
                            }, 
                        (err) => {                      
                        console.log("sendGridClient Send: " + err);
                        dummyClient.sendEmail(args)
                                  .then((res1) => 
                                  {
                                    console.log("dummyClient Send: " + res1);
                                    return 'Send via dummyClient';
                                  },
                                    (err1) => 
                                    {
                                      console.log("dummyClient Send: " + err1)
                                      return 'Sending failed';
                                    })
                                }
                          ); 
        //return result;
    }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));

/*app.get('/', (req, res) => {
    sendGridMail.setApiKey(key);
    const msg = {
        
      };

    sendGridMail
    .send(msg)
    .then(() => {}, error => {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    });
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
*/
