const express = require('express');
const path = require('path');
const app = express();
//require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const publicDirectory = path.join(__dirname, '../public');
const {localStrategy, jwtStrategy } = require('./strategies');
const {router: userRouter} = require('./routers/userRouter');
const { PORT, DATABASE_URL } = require('./config');


//mongoose.Promise = global.Promise();

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

//add another link to get to entries.html
app.get("/entries", (req, res) => {
    res.sendFile('entries.html', {root: publicDirectory});
})

app.get("/add-entry", (req, res) => {
    res.sendFile('addentry.html', {root: publicDirectory});
})

app.get("/login", (req, res) => {
    res.sendFile('login.html', {root: publicDirectory});
})

app.get("/register", (req, res) => {
    res.sendFile('register.html', {root: publicDirectory});
})

app.get("/settings", (req, res) => {
    res.sendFile('settings.html', {root: publicDirectory});
})

// CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', userRouter);
//app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});


// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
  }

  function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  }
  
  module.exports = { runServer, app, closeServer };