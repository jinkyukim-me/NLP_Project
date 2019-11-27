const express = require('express');
const app = express();
const routes = express.Router();
const session = require('express-session');
const knex = require('knex');
const cors = require("cors");
const env = require('dotenv').config();
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

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
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;
  
  db.raw(`SELECT email, salt, encrypt_pass FROM user WHERE email = '${clientEmail}'`)
  .then((response) => {
    const serverEmail = response[0][0].email;
    const salt = response[0][0].salt;
    const serverPassword = response[0][0].encrypt_pass;
    
    bcrypt.compare(clientPassword + salt, serverPassword, (err, res) => {
      if (err) {
        return next(err);
      }
    });
    console.log(response);
    
    req.session.user = clientEmail;
    res.redirect(204, '/auth/setting');
  })
  .catch((error) => {
    console.error(error);
  });
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
  })
});

module.exports = routes;