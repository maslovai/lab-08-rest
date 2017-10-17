'use strict';
const url = require('url');
const queryString  = require('querystring');
const route = require('./router.js')
module.exports = (req) => {
  return new Promise((resolve, reject)=>{
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);


    
    req.on("error", reject);
  })
}
