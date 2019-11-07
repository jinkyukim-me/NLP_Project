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

app.post('/user', (req, res) => {
  const email = req.body.email;
  
  db.raw(`INSERT INTO user (email, created_data_time) VALUES (${email}, $now())`)
  .then((response) => {
    res.status(200).end('OK');
  })
  .catch((error) => {
    console.log(error);
    console.log(`EMAIL: ${email}`);
    res.status(500).end('FAILED');
  });
});

app.listen(9000, () => {
  console.log('server started at 9000');
});