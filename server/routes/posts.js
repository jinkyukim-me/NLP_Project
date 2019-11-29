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

// router.use((req, res, next) => {
//   const token = req.cookies.user;
//   // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
//   if (token) {
//     console.log('decoded');
//     next();
//   } else {
//     console.log('decoded failed haha');
//     res.redirect('http://localhost:3000/');
//   }
// });

router.get('/:view', (req, res) => {
  const regExpDate = /^20\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
  const view = req.params.view;
  const userId = 31;
  // const date = this.props.date;
  // const date = req.body.date;
  
  if (view.match(regExpDate)) {
    db.raw(`SELECT id, paragraph, created_data_time FROM post WHERE user_id = ${userId}`)
    .then((response) => {
      const days = response[0];
      const pickedDays = [];
      
      for (let i = 0; i < 3; i++) {
        const id = days[i].id;
        const paragraph = days[i].paragraph;
        const createPostTime = days[i].created_data_time;
        const createPostDate = createPostTime.toISOString().substr(0, 10);
        
        if (view === createPostDate) {
          pickedDays.push({
            id: id,
            paragraph: paragraph,
            date: createPostDate,
          });
        }
      }
      
      res.status(200).json({
        todays_post: pickedDays
      });
      // res.redirect(`/post/${view}`);
    })
    .catch((error) => {
      console.error(error);
    });
  }
});

module.exports = router;