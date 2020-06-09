var app = require("../../services/sendGridClient");

describe("Verifying sendEmail via sendGridClient",function(){   
    var args; 
    beforeEach(function () {
        args = { to: '', from: ''};         
    });
    
    it("Should validate the response of sendGridClient",function() {
        spyOn(app.sendGridMail, 'send').and.returnValue(Promise.resolve(true));
        var value = app.sendGridMail.send(null);   
        expect(value).toBeInstanceOf(Promise);
    });

    it("Should call send method of sendGridClient: Failure",function() {
        spyOn(app.sendGridMail, 'send').and.returnValue(Promise.reject(false));
        app.sendEmail(args).then({}, 
                                 (err) => expect(err).toEqual(false)
                                );
    });

    it("Should call send method of sendGridClient: Successful",function() {  
        spyOn(app.sendGridMail, 'send').and.returnValue(Promise.resolve(true));         
        app.sendEmail(args).then((res) => 
                                {
                                    expect(res).toEqual(true)                                   
                                }); 
    });
});