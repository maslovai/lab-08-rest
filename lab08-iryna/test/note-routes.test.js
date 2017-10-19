'use strict';
 const PORT = 8000;
 const server = require('../lib/server');
 const request = require('superagent');
 const expect = require('expect');
 // const host = 'http://localhost:'+ PORT;

 describe('server', function() {
   before(function(done) {
     server.start(PORT, done);
   });
   after(function(done) {
     server.stop(done);
   });
 });

 describe('post test - 200', function(){
   it('should respond with the body content for a post request with a valid body',function(done){
     request
     .post(`http://localhost:${PORT}/api/notes`)
     .send({title:"First Note", content:"First text"})
     .end((err,res) => {
       expect(err).toBe(null);
       expect(res.status).toEqual(200);
       expect(res.body.title).toBe("First Note");
       expect(res.body.content).toBe("First Text");
       let idForGet = note.id;
     })
   })
 });

 describe('post test - 400', function(){
   it('should respond with  "bad request" if no request body',function(done){
     request
     .post(`http://localhost:${PORT}/api/notes`)
     .send({})
     .end((err,res) => {
       expect(err).not.toBe(null);
       expect(res.status).toEqual(400);
       expect(res.text).toBe("bad request");
     })
   })
 });

 describe('post test - 400', function(){
 it('should respond with  "bad request" if request body is invalid',function(done){
   request
   .post(`http://localhost:${PORT}/api/notes`)
   .send({title:"First Note", content:""})
   .end((err,res) => {
     expect(err).not.toBe(null);
     expect(res.status).toEqual(400);
     expect(res.text).toBe("Missing Content");
   })
 })
});

 describe('api', function(){
   it('should contain a response body for a request made with a valid id', function(done){
     request
     .get(`http://localhost:${PORT}/api/notes?id=${idForGet}`)
     .end((err, res => {
       expect(res.status).toBe(200);
       expect(res.body).not.toBe(null);
       expect(note.id).toEqual(idForGet);
       done();
     }))
   })
 })

 describe('api', function(){
   it(' should respond with "not found" for an id that was not found', function(done){
     request
     .get(`http://localhost:${PORT}/api/notes?id=5`)
     .end((err, res => {
       expect(res.status).toBe(404);
       expect(res.text).toEqual('invalid note');
       done();
     }))
   })
 })

 describe('api', function(){
   it('should return a status code of 404 for routes that have not been registered', function(done){
     request
      .get(`http://localhost:${PORT}/api/notregistered`)
      .end((err, res) => {
        expect(err).not.toBe(null);
        expect(res.status).toBe(404);
        done();
      });
   });
 });
