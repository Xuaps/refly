var session = require('../routes/refly-session.js');

describe('refly-session', function(){
    it('should create one new session if it doesnt exist', function(){
        var req = {session:{}};
        session(req);
        expect(req.session.id).toBeDefined(); 
        expect(req.session.timestamp).toBeDefined(); 
    });
});
