import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user.model';
import config from '../config/config';

// local strategy
const localStr = {
    usernameField: 'email', // xac thuc truong email :v
};

const localStrategy = new LocalStrategy(
    localStr,
    async (email, password, done) => {
        try {
            const user = await User.findOne({ 'email': email });
            if (!user) {
                return done(null, false);
            } else if (!user.authenticateUser(password)) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(null, false);
        }
    }
);


// JWT strategy
const jwtStr = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET_USER
};

const jwtStrategy = new JWTStrategy(jwtStr, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(null, false);
    }
});
passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });