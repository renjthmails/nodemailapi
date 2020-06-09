var app=require("../../services/dummyClient");
describe("Verifying sendEmail via dummyClient",function(){
    var args; 
    beforeEach(function () {
        args = { to: '', from: ''};         
    });

    it("Should validate the response  of dummyClient",function() {
        var value = app.sendEmail(null);
        expect(value).toBeInstanceOf(Promise);
    });

    it("Should call send method of dummyClient: Failure",function() {
        spyOn(app, 'sendEmail').and.returnValue(Promise.reject(false));
        app.sendEmail(args).then({}, 
                                 (err) => expect(err).toEqual(false)
                                );
    });

    it("Should call send method of dummyClient: Successful",function() {  
        spyOn(app, 'sendEmail').and.returnValue(Promise.resolve(true));         
        app.sendEmail(args).then((res) => 
                                {
                                    expect(res).toEqual(true)                                   
                                }); 
    });
});