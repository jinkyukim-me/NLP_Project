const express = require('express');
const knex = require('knex');
const cors = require('cors');
const dotenv = require('dotenv').config();

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
  
  db.raw(`INSERT INTO user (email, created_data_time) VALUES ('${email}', now())`)
  .then((response) => {
    res.status(200).end('OK');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).end('FAILED');
  });
});

app.post('/post', (req, res) => {
  const paragraph = req.body.paragraph;
  const affectivity = req.body.affectivity;
  
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
});

app.post('/edit_post', (req, res) => {
  const userId = req.body.user_id;
  const postId = req.body.post_id;
  const paragraph = req.body.paragraph;
  
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