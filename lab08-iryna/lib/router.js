'use strict';
const parser = require('./body-parser');
const routeHandlers = {
  GET: {},
  PUT: {},
  POST: {},
  PATCH: {},
  DELETE: {}
};
module.exports = {
  get: (url, callback) => {
    routeHandlers.get[url] = callback;
  },
  route: (req, res) => {

  }
}
