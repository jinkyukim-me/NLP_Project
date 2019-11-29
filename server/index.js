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

app.get('/', (req, res) => {
  const token = req.cookies.user;
  
  if (!token) {
    console.log(`!decoded`);
    
    res.redirect('/auth/login');
  }
});

app.post('/post/write', (req, res) => {
  // let num = /^\d+?/;
  // let view = req.params.view;
  // const userId = req.body.user_id;
  const userId = 31;
  const postDate = req.body.postDate;
  const paragraph = req.body.paragraph;
  const affectivity = req.body.affectivity;
  
  db.raw(`INSERT INTO post (user_id, paragraph, created_data_time, modified_data_time) VALUES (${userId}, '${paragraph}', now(), now())`)
  .then((response) => {
    res.status(200).end('OK');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).end('FAILED');
  });
  
  db.raw(`INSERT INTO emotion (affectivity, created_data_time) VALUES ('${affectivity}', now())`)
  .then((response) => {
    res.status(200).end('OK');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).end('FAILED');
  });
});

app.put('/post/modify', (req, res) => {
  const userId = 31;
  const paragraph = req.body.paragraph;
  const affectivity = req.body.affectivity;
  
  db.raw(`UPDATE post SET paragraph = '${paragraph}', modified_data_time = now() WHERE user_id = ${userId}`)
  .then((response) => {
    res.status(200).end('OK');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).end('FAILED');
  });
});

app.post('/post/:view', (req, res) => {
  const num = /^\d+?/;
  const view = req.params.view;
  const userId = 31;
  // const date = this.props.date;
  const {date} = this.props.state;
  
  if (view.match(num)) {
    db.raw(`SELECT id, paragraph, created_data_time FROM post WHERE user_id = ${userId}`)
    .then((response) => {
      const days = response[0];
      const pickedDays = [];
      
      for (let i = 0; i < 3; i++) {
        const id = days[i].id;
        const paragraph = days[i].paragraph;
        const dbDate = days[i].created_data_time;
        
        if (date === dbDate) {
          pickedDays.push({id: id, paragraph: paragraph});
        }
      }
      
      console.log(date, pickedDays, typeof dbDate);
      res.end('ok');
    })
    .catch((error) => {
      console.error(error);
    });
  }
});

// app.get('/list', (req, res) => {
  // const 
// });

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