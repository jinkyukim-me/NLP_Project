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
const posts = require('./routes/posts');
const mysql = require('mysql');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
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

// const authenticate = (req, res, next) => {
//   const token = req.cookies.user;
  
//   if (token) {
//     return next();
//   }
  
//   res.redirect('/');
// }

app.use('/auth', auth);
app.use('/post', posts);

app.get('/', (req, res) => {
  const token = req.cookies.user;
  
  if (!token) {
    console.log(`!decoded`);
    
    // res.redirect('autsh/login');
  }
});

app.put('/setting', (req, res) => {
  // const token = req.cookies.user;
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = 31;
  const clientEmail = 'test@gmail.com';
  const clientPassword = req.body.password;
  let salt;
  
  db.raw(`SELECT email, salt, encrypt_pass FROM user WHERE email = '${clientEmail}'`)
  .then((response) => {
    // const serverEmail = response[0][0].email;
    salt = response[0][0].salt;
    // const serverPassword = response[0][0].encrypt_pass;
    // const result = bcrypt.compareSync(clientPassword + salt, serverPassword);
  })
  .catch((error) => {
    console.error(error);
  });
  
  bcrypt.hash(clientPassword + salt, 10, (err, hash) => {
    if (err) {
      console.error(err);
      
      return;
    }
    
    db.raw(`UPDATE user SET encrypt_pass = '${hash}' WHERE id = ${userId}`)
    .then((response) => {
      res.status(200).end('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end('FAILED');
    });
  });
  
  
  
  // if (decoded) {
  //   console.log('decoded');
    
  //   res.end('ok');
  // } else {
  //   console.log('decoded failed');
    
  //   res.redirect('/auth/login');
  // }
});

app.listen(9000, () => {
  console.log('server start on 9000 port!!');
});