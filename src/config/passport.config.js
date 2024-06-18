import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import UsersServices from '../services/users.services.js';
import config from './config.js';
import { isValidPassword } from '../utils/passwords.utils.js';
import { ExtractJwt } from 'passport-jwt';

const cookieExtractor = req => req?.signedCookies?.token ?? null;

const initializePassport = () => {
    passport.use('register', new local.Strategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, age, documents, last_connection } = req.body;
                if (!first_name || !last_name || !username || !password) {
                    return done(null, false, 'Los campos nombre, apellido, correo electrónico y contraseña son obligatorios');
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(username)) {
                    return done(null, false, 'El correo electrónico ingresado no es válido');
                }
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(password)) {
                    return done(null, false, 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial');
                }
                const user = await UsersRepository.getInstance().getUserByEmail(username);
                if (user) {
                    return done(null, false, `Ya existe un usuario registrado con el correo electrónico ${username}`);
                }
                const newUser = await UsersRepository.getInstance().createUser({
                    first_name,
                    last_name,
                    email: username,
                    age,
                    password,
                    role,
                    documents,
                    last_connection
                });
                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new local.Strategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return done(null, false, 'Los campos correo electrónico y contraseña son obligatorios');
                }
                if (email === config.adminEmail && password === config.adminPassword) {
                    return done(null, {
                        first_name: 'Admin',
                        email: config.adminEmail,
                        role: 'admin'
                    });
                }
                const user = await UsersRepository.getInstance().getUserByEmail(username);
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



    passport.use('current', new jwt.Strategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: config.jwtSecret
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