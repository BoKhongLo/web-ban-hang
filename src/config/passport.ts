import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from 'passport-jwt'
import { UserModel, IUser } from "../models/Users.model";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.use(
    new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
        try {
            console.log(`username ${username} password ${password}`);
            const user = await UserModel.findOne({ username: username });
            if (!user) {
                return done(undefined, false, { message: `username ${username} not found.` });
            }
            
            // if (isMatch) {
            //     return done(undefined, user);
            // } else {
            //     return done(undefined, false, { message: 'Invalid username or password.' });
            // }
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "super-secret",
        },
        async function (jwtToken, done) {
            try {
                const user = await UserModel.findOne({ id: jwtToken.id });
                if (user) {
                    return done(undefined, user, jwtToken);
                } else {
                    return done(undefined, false);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "super-secret",
        },
        async function (jwtToken, done) {
            try {
                const user = await UserModel.findOne({ id: jwtToken.id });
                if (user) {
                    return done(undefined, user, jwtToken);
                } else {
                    return done(undefined, false);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    )
);
