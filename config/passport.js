const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../config/database');

/**
 * Passport configurations.
 * Passport receives a JSON Web Token - payload.
 */
module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.getUserById(jwt_payload.data._id, function (err, user) {
            if(err) {
                return done(err, false);
            }

            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}