const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv').config();
const knex = require('knex');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
// const LocalStorage = require('node-localstorage').LocalStorage;
// const localStorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');
const auth = require('./routes/auth');
const mysql = require('mysql');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'one_sentence',
  resave: false,
  saveUninitialized: false,
}));

const authenticate = (req, res, next) => {
  const token = req.cookies.user;
  
  if (!token) {
    return next();
  }
  
  res.redirect('/');
}

app.use('/auth', authenticate, auth);

app.get('/', (req, res) => {
  const token = req.cookies.user;
  
  if (!token) {
    console.log(`!decoded`);
    
    res.redirect('/auth/login');
  }
});


app.get('/setting', (req, res) => {
  const token = req.cookies.user;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  if (decoded) {
    console.log('decoded');
    
    res.end('ok');
  } else {
    console.log('decoded failed');
    
    res.redirect('/auth/login');
  }
});

app.listen(9000, () => {
  console.log('server start on 9000 port!!');
});