'use strict';
 const PORT = 8000;
 const server = require('../lib/server');
 const request = require('superagent');
 const expect = require('expect');
 let idForGet;

 describe('API', function(){

   before(function() {
     server.start();
   });
   after(function() {
     server.stop();
   });

  it('should respond with the body content for a post request with a valid body',function(){
       request
       .post(`http://localhost:${PORT}/api/notes`)
       .send({title:"First Note", content:"First Text"})
      //  .set({"Content-Type":"application/json"})
       .end((err,res) => {
         expect(res.status).toEqual(200);
         expect(res.body.title).toBe("First Note");
         expect(res.body.content).toBe("First Text");
         idForGet = res.body.id;
        //  done();
       })
   });

    it('should contain a response body for a request made with a valid id', function(){
        request
        .get(`http://localhost:${PORT}/api/notes?id=${idForGet}`)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body).not.toBe(null);
          // done();
        })
    })

    it('should respond with  "bad request" if no request body',function(){
          request
          .post(`http://localhost:${PORT}/api/notes`)
          .send({})
          .end((err,res) => {
            expect(err).not.toBe(null);
            expect(res.status).toEqual(400);
            expect(res.text).toBe("bad request");
            // done();
          })
     });

     it('should respond with  "bad request" if request body is invalid',function(){
       request
       .post(`http://localhost:${PORT}/api/notes`)
       .send({title:"First Note", content:""})
       .end((err,res) => {
         expect(err).not.toBe(null);
         expect(res.status).toEqual(400);
         expect(res.text).toBe("Missing Content");
        //  done();
       })
     })

     it(' should respond with "not found" for an id that was not found', function(){
          request
          .get(`http://localhost:${PORT}/api/notes?id=5`)
          .end((err, res) => {
            expect(res.status).toBe(404);
            expect(res.text).toEqual('invalid note');
            // done();
          })
      })

      it('should return a status code of 404 for routes that have not been registered', function(){
            request
             .get(`http://localhost:${PORT}/api/notregistered`)
             .end((err, res) => {
               expect(err).not.toBe(null);
               expect(res.status).toBe(404);
              //  done();
             });
      });
  });
