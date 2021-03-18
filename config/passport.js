import dotenv from 'dotenv';
import passport from 'passport';
import passportJwT from 'passport-jwt';
import User from '../models/User';

// Set up environment variable support
dotenv.config();

// Define JSON Web Token strategy
const JwTStrategy = passportJwT.Strategy;
const extractJwT = passportJwT.ExtractJwt;

// Define options for strategy
const options = {
  algorithms: ['HS256'],
  jwtFromRequest: extractJwT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const jwtStrategy = new JwTStrategy(options, (jwtPayload, done) => {
  User.findById(jwtPayload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }

    return done(null, false);
  });
});

passport.use(jwtStrategy);

const authJwt = passport.authenticate('jwt', {
  session: false,
});

export default authJwt;
