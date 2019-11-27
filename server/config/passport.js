const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config();

// const db = knex({
//   client: "mysql",
//   connection: {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   }
// });

const passportConfig = () => {
  passport.use(new LocalStrategy({
    usernameField: req.body.email,
    passwordField: req.body.password,
  }, (email, password, done) => {
    return UserModel.findOne({email, password})
      .then((user) => {
        if (!user) {
          return done(null, false, {message: '잘못된 이메일 또는 비밀번호입니다.'});
        }
        
        return done(null, user, {message: '로그인 성공'});
      })
      .catch((error) => {
        done(error);
      });
    // db.raw(`SELECT email, salt, encrypt_pass FROM user WHERE email = '${clientEmail}'`)
    // .then((response) => {
    //   const serverEmail = response[0][0].email;
    //   const salt = response[0][0].salt;
    //   const serverPassword = response[0][0].encrypt_pass;
      
    //   bcrypt.compare(clientPassword + salt, serverPassword, (err, res) => {
    //     if (err) {
    //       return next(err);
    //     }
    //   });
    //   console.log(response);
      
    //   req.session.user = clientEmail;
    //   res.redirect(204, '/auth/setting');
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }));
  
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, (jwtPayload, done) => {
    return UserModel.findOneById(jwtPayload.id)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  }));
}

module.exports = passportConfig;