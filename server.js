const express = require('express'); // importing a CommonJS module

const logger = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json(), logger('dev'));

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
    `);
});

module.exports = server;
