'use strict';
const parse = require('./body-parser');
const routeHandlers = {
  GET: {},
  PUT: {},
  POST: {},
  PATCH: {},
  DELETE: {}
};
module.exports = {
  get: (url, callback) => {
    routeHandlers.GET[url] = callback;
  },
  post: (url, callback) => {
    routeHandlers.POST[url] = callback;
  },
  route: (req, res) => {
  // parse req
  //return 400 if invalid
  //find handler (400 if not there)
  parse(req)
  .then( (req) =>{
    let handler = routeHandlers[req.method][req.url.pathname];
    if (handler) return(req, res)
    else {
      console.log('not found: ', req.url.pathname);
      res.writeHead(400);
      res.end();
    }
  })
  .catch((err) => {
    console.error('invalid request ', err);
    res.writeHead(400);
    res.end();
  })
 }
}
