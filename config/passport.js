const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwtPayload, done) => {
			User.findById(jwtPayload.id)
				.then(user => {
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				})
				.catch(err => console.log(err));
		})
	);
};