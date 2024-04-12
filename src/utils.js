import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from './config/config.js';

const BCRYPT_SALT = config.bcryptSalt;
const JWT_SECRET = config.jwtSecret;
const JWT_EXPIRATION = config.jwtExpiration;
const COOKIE_MAX_AGE = config.cookieMaxAge;

const __dirname = dirname(fileURLToPath(import.meta.url));

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(BCRYPT_SALT));

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

const generateToken = (res, user) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    res.cookie('token', token, { maxAge: COOKIE_MAX_AGE, httpOnly: true, signed: true });
}

const validateToken = token => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export { __dirname, createHash, isValidPassword, generateToken, validateToken };