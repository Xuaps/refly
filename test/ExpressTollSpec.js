var Toll = require('../routes/express-toll.js');

describe('express-toll', function(){
    var data = { 
        req: {},
        res: {
            set: function(){},
            send: function(){},
            status: function(){}
        },
        next: function(){}
    };

    it('should let pass the request when the condition is satisfied', function(){
        spyOn(data, 'next');

        var toll  = new Toll(function(){return true;});
        toll.activate()(data.req, data.res, data.next);

        expect(data.next).toHaveBeenCalled();
    });

    it('should stop the request and return a 402 when the condition is not satisfied', function(){
        spyOn(data, 'next');
        spyOn(data.res, 'status');

        var toll = new Toll(function(){return false;});
        toll.activate()(data.req, data.res, data.next);

        expect(data.res.status).toHaveBeenCalledWith(402);
        expect(data.next).not.toHaveBeenCalled();
    });
});
