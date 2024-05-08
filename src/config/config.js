import dotenv from 'dotenv';

// Se obtiene el entorno de ejecución
const environment = process.env.NODE_ENV || 'development';
// Se carga el archivo de conf. correspondiente al entorno
dotenv.config({ path: environment === 'development' ? './.env.dev' : './.env.prod' });


const config = {
    frontendUrl: process.env.FRONTEND_URL,
    port: parseInt(process.env.PORT),
    mongoURL: process.env.MONGO_URL,
    bcryptSalt: parseInt(process.env.BCRYPT_SALT),
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    cookieSecret: process.env.COOKIE_SECRET,
    cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE),
    nodeMailerUser: process.env.NODEMAILER_USER,
    nodeMailerPass: process.env.NODEMAILER_PASS,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
}

export default config;