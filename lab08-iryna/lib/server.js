'use strict';
const http = require('http');
require('./router');
const note = reqiure('./note-router');
// require('dotenv').config();
const server = module.exports = http.createServer(router.route);
module.exports = {
  start: ()=>{
    return new Promise((resolve, reject)=>{

    })
  },
  stop: ()=>{
    return new Promise((resolve, reject)=>{

    })
  }
}
server.listen(process.env.PORT, console.log('running on', process.env.PORT));
