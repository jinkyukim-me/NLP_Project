const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv').config();
const knex = require('knex');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'one_sentence',
  resave: false,
  saveUninitialized: false,
}));

const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});

app.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/auth/login');
  }
});

app.post('/auth/login', (req, res) => {
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;
  
  db.raw(`SELECT email, salt, encrypt_pass FROM user WHERE email = '${clientEmail}'`)
  .then((response) => {
    const serverEmail = response[0][0].email;
    const salt = response[0][0].salt;
    const serverPassword = response[0][0].encrypt_pass;
    
    const result = bcrypt.compareSync(clientPassword + salt, serverPassword);
    
    if (result) {
      req.session.user = req.body.email;
      res.sendStatus(204);
      // res.status(204).set('token', process.env.TOKEN_STRING).json({user_id: clientEmail});
      
      return;
    }
    
    res.status(401).json({isLogined: false});
  })
  .catch((error) => {
    console.error(error);
  });
});

app.get('/setting', (req, res) => {
  console.log(req.session);
  
  if (req.session.user) {
    console.log('setting enter');
  } else {
    console.log('setting not enter');
  }
});

app.listen(9000, () => {
  console.log('server start on 9000 port!!');
});