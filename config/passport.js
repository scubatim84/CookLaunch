import passport from 'passport';
import User from '../models/User.js';

const passportJwT = require('passport-jwt');
const JwTStrategy = passportJwT.Strategy;
const extractJwT = passportJwT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: extractJwT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const jwtStrategy = new JwTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate('jwt', {
  session: false,
});
