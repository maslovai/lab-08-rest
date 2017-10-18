'use strict';
const http = require('http');
const router = require('./router');
const note = require('./note-router');
// require('dotenv').config();
const server = module.exports = http.createServer(router.route);
let isRunning = false;

module.exports = {
  start: ()=>{
    return new Promise((resolve, reject)=>{
      if (!isRunning){
        server.listen(process.env.PORT, (err)=>{
          if (err){
            reject(err)
          }
          else {
            isRunning = true;
            resolve('Server running on port ${process.env.PORT}')
          }
        })
      }
      else reject('Server is already running on port ${process.env.PORT}')
    })
  },
  stop: ()=>{
    return new Promise((resolve, reject)=>{
        if(!isRunning){
          reject('server is already off');
        }
        else{
          server.close((err) => {
            if (err) reject(err)
            else{
              isRunning = false;
              resolve('Shutting down');
            }
          })
        }
    })
  }
}
server.listen(process.env.PORT, console.log('running on', process.env.PORT));
