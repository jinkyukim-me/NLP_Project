const express = require('express');
const app = express();
const session = require('express-session');
const router = express.Router();
const knex = require('knex');
const cors = require("cors");
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');

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

router.use((req, res, next) => {
  const token = req.cookies.user;
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  if (token) {
    console.log('decoded');
    
    res.redirect('/');
  } else {
    console.log('decoded failed haha');
    next();
  }
});

router.post('/login', (req, res) => {
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;
  
  db.raw(`SELECT email, salt, encrypt_pass FROM user WHERE email = '${clientEmail}'`)
  .then((response) => {
    const serverEmail = response[0][0].email;
    const salt = response[0][0].salt;
    const serverPassword = response[0][0].encrypt_pass;
    const result = bcrypt.compareSync(clientPassword + salt, serverPassword);
    
    if (result) {
      const token = jwt.sign({
        user_id: clientEmail,
      }, process.env.JWT_SECRET, {
        expiresIn: '60m',
      });
      res.cookie('user', token);
      res.status(204).json({token: token});
      // res.status(204).set('token', process.env.TOKEN_STRING).json({user_id: clientEmail});
      
      return;
    }
    
    res.status(401).json({isLogined: false});
  })
  .catch((error) => {
    console.error(error);
  });
});

router.post('/signup', (req, res, next) => {
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

module.exports = router;