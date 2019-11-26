const express = require('express');
const session = require('express-session');
const knex = require('knex');
const cors = require('cors');
const dotenv = require('dotenv').config();
const crypto = require('crypto');
const router = express.Router();
const bcrypt = require('bcrypt');

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
app.use(session({
  secret: 'one_sentence',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  if (!req.session.user) {
    this.props.history.push('/login');
  }
});

app.post('/login', (req, res) => {
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;
  
  db.raw(`SELECT email, salt, encrypt_pass FROM user WHERE email = '${clientEmail}'`)
  .then((response) => {
    console.log(response[0][0]);
    
    const serverEmail = response[0][0].email;
    const serverSalt = response[0][0].salt;
    const serverPassword = response[0][0].encrypt_pass;
    const hashPassword = crypto.createHash('sha512').update(clientPassword + serverSalt).digest('base64');
    const result = bcrypt.compareSync(hashPassword, serverPassword);
    
    console.log(`clientPassword=${hashPassword} / serverPassword=${serverPassword} / result=${result}`);
    
    
    if (clientEmail === serverEmail && result) {
      console.log('login success!!');
      
      res.session.user = clientEmail;
      return res.json({message: 'success'});
    }
    
    return res.status(400).json({message: 'failed'});
  })
  .catch((error) => {
    console.error(error);
    res.status(500).end('FAILED');
  })
});

app.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = `${Math.round(new Date().valueOf() * Math.random())}`;
  
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
// HTTP header Authorization => Bearer 1234128asldf-asdflkajsvxc-sdf 
// post single
app.post('/post/:view', (req, res) => {
  const num = /^\d+?/;
  const view = req.params.view;
  const userId = req.body.user_id;
  const postId = req.body.post_id;
  const postDate = req.body.postDate;
  const paragraph = req.body.paragraph;
  const affectivity = req.body.affectivity;
  
  if (view === 'write') {
    console.log(`paragraph = ${paragraph}`);
    
    db.raw(`INSERT INTO post (create_post_date, paragraph, created_data_time) VALUES (${postDate}, '${paragraph}', now())`)
    .then((response) => {
      res.status(200).end('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end('FAILED');
    });
    
    // db.raw(`INSERT INTO post (affectivity, created_data_time) VALUES ('${affectivity}', now())`)
    // .then((response) => {
    //   res.status(200).end('OK');
    // })
    // .catch((error) => {
    //   console.error(error);
    //   res.status(500).end('FAILED');
    // });
    return;
  }
  // if (view.match(num)) {
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
  //   return;
  // }
  
  if (view === 'modify') {
    db.raw(`UPDATE post SET id='${userId}', post_id='${postId}', paragraph='${paragraph}', modified_data_time=now()`)
    .then((response) => {
      res.status(200).end('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status.end('FAILED');
    });
  }
});

app.get('/post/:view', (req, res) => {
  const num = /^\d+?/;
  const view = req.params.view;
  
  if (view.match(num)) {
    db.raw(`SELECT create_post_date, paragraph FROM post WHERE id=10`)
    .then((response) => {
      // console.log(response);
      res.status(200).send(response[0][0]);
      // console.log(response[0][0].create_post_date);
    })
    .catch ((error) => {
      res.status(500).end('FAILED');
    });
  }
});

app.listen(9000, () => {
  console.log('server started at 9000');
});