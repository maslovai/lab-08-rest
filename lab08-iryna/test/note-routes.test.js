'use strict';
 const PORT = 8080;
 const request = require('superagent');
 const expect = require('expect');
 const host = 'localhost:'+PORT;
 describe('server', function() {
   before(function(done) {
     server.listen(PORT, done);
   });

   after(function(done) {
     server.close(done);
   });
 describe('api', function(){
   it('should return a status code of 404 for routes that have not been registered', function(done){
     request
      .get(host + '/api/incorrect')
      .end((err, res) => {
        expect(err).not.toBe(null);
        expect(res.statu).toBe(404);
        done();
      });
   })
 })
