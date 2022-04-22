const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth_controller');

const passport = require('passport');
require('dotenv').config();

// jwt login strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        if (jwt_payload === process.env.ADMIN_EMAIL) {
            return done(null, true);
        }
        return done(null, false);
    })
);

/* GET login page. */
router.get('/', auth_controller.login_get);

/* POST login page */
router.post('/', auth_controller.login_post);

module.exports = router;
