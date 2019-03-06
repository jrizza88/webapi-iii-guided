const express = require('express'); // importing a CommonJS module
const logger = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');
const messages = require('./data/messages/messages-router');

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');
const securityMiddleware = helmet();


// server.use(express.json(), logger('dev'));


server.use(parser, logMiddleware, securityMiddleware,  teamNamer, teamLogger)

server.use('/api/hubs', restricted, hubsRouter);


function teamNamer(req, res, next) {
  req.team = 'pt3';
  next();
}

// order matters!
function teamLogger(req, res, next) {
  if (req.team) {
    console.log("team is: ", req.team)
  } 
  next();
}

function moodyGatekeeper(req, res, next) {
  // if the seconds (is mult of 3) 
  // send back status 403 and the message "shall not pass!"
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403)
    .send({
      error: "Shall not pass!!!"
    })
  } else {
    next();
  }
}

function restricted(req, res, next) {
  const password = req.headers.authorization;
  if (password === 'mellon') {
    next();
  } else if (password) {
    res.status(401).json({err: 'invalid credentials!'})
  } else {
    next({err: 'no credentials provided'})
  }
  // next();
}

// can just include the below in the global call of server.use
// server.use(teamNamer);

server.get('/',  (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team}, to the Lambda Hubs API</p>
    `);
});

server.use((err, req, res, next) => {
  res.status(400).json({
    message: 'error thrown in server',
    err: err
  })
})

module.exports = server;
