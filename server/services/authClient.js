import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import Client from '../models/client.model';
import config from '../config/config';

// local strategy
const localStr = {
    usernameField: 'email', // xac thuc truong email :v
};

const localStrategy = new LocalStrategy(
    localStr,
    async (email, password, done) => {
        try {
            const client = await Client.findOne({ 'local.email': email });
            if (!client) {
                return done(null, false);
            } else if (!client.authenticateClientUser(password)) {
                return done(null, false);
            }
            return done(null, client);
        } catch (err) {
            return done(null, false);
        }
    }
);


// JWT strategy
const jwtStr = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
};

const jwtStrategy = new JWTStrategy(jwtStr, async (payload, done) => {
    try {
        const client = await Client.findById(payload._id);
        if (!client) {
            return done(null, false);
        }
        return done(null, client);
    } catch (err) {
        return done(null, false);
    }
});
passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
