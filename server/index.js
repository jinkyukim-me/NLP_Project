const express = require('express');
const knex = require('knex');
const cors = require('cors');
const dotenv = require('dotenv').config();
const crypto = require('crypto');


const app = express();
const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // db.raw(`INSERT INTO user (email, password, created_data_time) VALUES ('${email}', ${encrypt_password}, now())`)
  // .then((response) => {
  //   res.status(200).end('OK');
  // })
  // .catch((error) => {
  //   console.error(error);
  //   res.status(500).end('FAILED');
  // });
});

app.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = crypto.randomBytes(64).toString('hex');
  const encrypt_pass = crypto.createHash('sha512').update(password + salt).digest('base64');
  console.log(`password = ${encrypt_pass}`);
  
  
  db.raw(`INSERT INTO user (email, salt, encrypt_pass, created_data_time) VALUES ('${email}', '${salt}', '${encrypt_pass}', now())`)
  .then((response) => {
    res.status(200).end('OK');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).end('FAILED');
  });
});

// app.post('/post', (req, res) => {
//   const paragraph = req.body.paragraph;
//   const affectivity = req.body.affectivity;
  
//   db.raw(`INSERT INTO post (create_post_date, paragraph, created_data_time) VALUES (now(), '${paragraph}', now())`)
//   .then((response) => {
//     res.status(200).end('OK');
//   })
//   .catch((error) => {
//     console.error(error);
//     res.status.end('FAILED');
//   });
  
//   db.raw(`INSERT INTO post (affectivity, created_data_time) VALUES ('${affectivity}', now())`)
//   .then((response) => {
//     res.status(200).end('OK');
//   })
//   .catch((error) => {
//     console.error(error);
//     res.status(500).end('OK');
//   });
// });

// app.post('/edit_post', (req, res) => {
//   const userId = req.body.user_id;
//   const postId = req.body.post_id;
//   const paragraph = req.body.paragraph;
  
//   db.raw(`UPDATE post SET id='${userId}', post_id='${postId}', paragraph='${paragraph}', modified_data_time=now()`)
//   .then((response) => {
//     res.status(200).end('OK');
//   })
//   .catch((error) => {
//     console.error(error);
//     res.status.end('FAILED');
//   });
// });

// post single
app.post('/post/:view', (req, res) => {
  const num = /^\d+?/;
  const view = req.params.view;
  const userId = req.body.user_id;
  const postId = req.body.post_id;
  const paragraph = req.body.paragraph;
  const affectivity = req.body.affectivity;
  
  if (view.match(num)) {
    db.raw(`INSERT INTO post (create_post_date, paragraph, created_data_time) VALUES (now(), '${paragraph}', now())`)
    .then((response) => {
      res.status(200).end('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status.end('FAILED');
    });
    
    db.raw(`INSERT INTO post (affectivity, created_data_time) VALUES ('${affectivity}', now())`)
    .then((response) => {
      res.status(200).end('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end('OK');
    });
    return;
  }
  
  db.raw(`UPDATE post SET id='${userId}', post_id='${postId}', paragraph='${paragraph}', modified_data_time=now()`)
  .then((response) => {
    res.status(200).end('OK');
  })
  .catch((error) => {
    console.error(error);
    res.status.end('FAILED');
  });
});

app.listen(9000, () => {
  console.log('server started at 9000');
});