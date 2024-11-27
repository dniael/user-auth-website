const { compareSync } = require('bcrypt');

const passport = require('passport')
,LocalStrategy = require('passport-local').Strategy
,UserModel = require('./user.js')
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }  
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((err, user) => {
        done(err, user)
    })
})
