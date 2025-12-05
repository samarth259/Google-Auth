const User = require('../UserM');
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
 require("dotenv").config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
 async function(accessToken, refreshToken, profile, cb){
      try {
          const [user] = await User.findOrCreate({
              where: { googleId: profile.id },
              defaults: {
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  picture: profile.photos[0].value
              }
          });
          return cb(null, user);  // user from DB
      } catch(err) {
          return cb(err, null);
      }
  }
));

passport.serializeUser((user, done) => {
    // Must use user.id (primary key)
    if (!user) return done(new Error("User is undefined"));
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        if (!user) return done(new Error("User not found"));
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});