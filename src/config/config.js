import options from './args.config.js';
import dotenv from 'dotenv';

// entorno de ejecución
const environment = options.environment;
// archivo de config al entorno
dotenv.config({ path: environment === 'development' ? './.env.dev' : './.env.prod' });

const config = {
    frontendUrl: process.env.FRONTEND_URL,
    port: parseInt(process.env.PORT),
    mongoUrl: process.env.MONGO_URL,
    bcryptSalt: parseInt(process.env.BCRYPT_SALT),
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    cookieSecret: process.env.COOKIE_SECRET,
    cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE),
    gitHubClientId: process.env.GITHUB_CLIENT_ID,
    gitHubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    nodeMailerUser: process.env.NODEMAILER_USER,
    nodeMailerPass: process.env.NODEMAILER_PASS,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
}

export default config;