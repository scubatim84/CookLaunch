const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = async (passport) => {
  const findUser = await passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id);
    })
  );

  try {
    if (findUser) {
      return done(null, findUser);
    } else {
      return done(null, false);
    }
  } catch (err) {
    console.log(err);
  }
};
