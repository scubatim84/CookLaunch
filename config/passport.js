const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const foundUser = await User.findById(jwt_payload.id);

        if (foundUser) {
          return done(null, foundUser);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
};
