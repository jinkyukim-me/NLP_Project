const express = require('express');
const session = require('express-session');
const app = express();
const routes = express.Router();
const knex = require('knex');
const cors = require("cors");
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});

routes.post('/login', (req, res, next) => {
  // passport.authenticate('local', {session: false}, (err, user, info) => {
  //   if (err || !user) {
  //     return res.status(400).json({
  //       message: '무언가가 잘못 되었습니다.',
  //       user: user
  //     });
  //   }
    
  //   req.login(user, {session: false}, (err) => {
  //     if (err) {
  //       res.send(err);
  //     }
      
  //     const token = jwt.sign(user, process.env.JWT_SECRET);
  //     return res.json({
  //       user: token
  //     });
  //   });
  // });
  
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;
  
  db.raw(`SELECT email, salt, encrypt_pass FROM user WHERE email = '${clientEmail}'`)
  .then((response) => {
    const serverEmail = response[0][0].email;
    const salt = response[0][0].salt;
    const serverPassword = response[0][0].encrypt_pass;
    
    bcrypt.compare(clientPassword + salt, serverPassword, (err, res) => {
      if (err) {
        console.log('login failed');
        
        return next(err);
      }
      
      return next();
    });
  })
  .catch((error) => {
    console.error(error);
  });
}, (req, res) => {
  console.log(req, req.session);
  
  req.session.user = req.body.email;
  res.redirect(204, '/');
});

routes.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = `${Math.round(new Date().valueOf() * Math.random())}`;
  
  // const salt = bcrypt.genSalt(10, function(err, salt) {
  //   if (err) {
  //       console.log('bcrypt.genSalt() errer : ', err.message);
  //   } else {
  //       bcrypt.hash(plainTextPassword, salt, null, function(err, hash) {
  //           if (err) { console.log('bcrypt.hash() errer : ', err.message); } 
  //           else { console.log(hash); }
  //       });
  //     }
  //   });
  // });
  
  bcrypt.hash(password + salt, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    
    db.raw(`INSERT INTO user (email, salt, encrypt_pass, created_data_time) VALUES ('${email}', '${salt}', '${hash}', now())`)
    .then((response) => {
      res.status(200).end('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end('FAILED');
    });
  });
});

module.exports = routes;