import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import config from './config.js';
import UsersServices from '../services/users.services.js';
import { createHash, isValidPassword } from '../utils.js';

const ADMIN_PASSWORD = config.adminPassword;
const ADMIN_EMAIL = config.adminEmail;
const JWT_SECRET = config.jwtSecret;

const localStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const cookieExtractor = req => req?.signedCookies?.token ?? null;

const initializePassport = () => {
    passport.use('register', new localStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, age } = req.body;
                if (!first_name || !last_name || !username || !age || !password) {
                    return done(null, false, 'Falta completar campos obligatorios');
                }
                let user = await UsersServices.getInstance().getUserByEmail(username);
                if (user) {
                    return done(null, false, `Ya existe un usuario registrado con el correo electrónico ${username}`);
                }
                user = await UsersServices.getInstance().createUser({
                    first_name,
                    last_name,
                    email: username,
                    age,
                    password
                });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new localStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return done(null, false, 'Falta completar campos obligatorios');
                }
                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    return done(null, {
                        first_name: 'Admin',
                        email: ADMIN_EMAIL,
                        role: 'admin'
                    });
                }
                const user = await UsersServices.getInstance().getUserByEmail(username);
                if (!user) {
                    return done(null, false, `No existe un usuario registrado con el correo electrónico ${username}`);
                }
                if (!isValidPassword(password, user)) {
                    return done(null, false, 'La contraseña ingresada es incorrecta');
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));


    passport.use('restore', new localStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return done(null, false, 'Falta completar campos obligatorios');
                }
                let user = await UsersServices.getInstance().getUserByEmail(username);
                if (!user) {
                    return done(null, false, `No existe un usuario registrado con el correo electrónico ${username}`);
                }
                user.password = createHash(password);
                user = await UsersServices.getInstance().updateUser(user._id, user);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('jwt', new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: JWT_SECRET
        },
        async (jwtPayload, done) => {
            try {
                return done(null, jwtPayload);
            } catch (error) {
                return done(error);
            }
        }
    ));
}

export default initializePassport;