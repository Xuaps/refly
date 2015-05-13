var session = require('../routes/client-manager.js');

describe('client-manager', function(){
    it('should create one new client id if it doesnt exist', function(){
        var req = {session:{}};
        session(req);
        expect(req.session.client_id).toBeDefined(); 
    });
});
