const sg = require('@sendgrid/mail');
const key = process.env.SENDGRID_API_KEY || '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';
sg.setApiKey(key);

class sendGridClient
{
    constructor()
    {
        this.sendGridMail = sg;
    }

    sendEmail(args) {              
        return this.sendGridMail.send(args);           
    }
}


module.exports = new sendGridClient();