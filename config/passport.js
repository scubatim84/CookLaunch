import dotenv from 'dotenv';
import passport from 'passport';
import passportJwT from 'passport-jwt';
import User from '../models/User.js';

// Set up environment variable support
dotenv.config();

// Define JSON Web Token strategy
const JwTStrategy = passportJwT.Strategy;
const extractJwT = passportJwT.ExtractJwt;

// Define options for strategy
const options = {
  jwtFromRequest: extractJwT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const jwtStrategy = new JwTStrategy(options, (jwt_payload, done) => {
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
