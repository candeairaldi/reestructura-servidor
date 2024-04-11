import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import passport from 'passport';

import config from './config/config.js';
import { __dirname } from './utils.js';
import initializePassport from './config/passport.config.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import SessionsRouter from './routes/sessions.router.js';
import ViewsRouter from './routes/views.router.js';
import initializeSocket from './config/socket.config.js';

const PORT = config.port;
const COOKIE_SECRET = config.cookieSecret;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser(COOKIE_SECRET));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

initializePassport();
app.use(passport.initialize());

app.use('/api/products', ProductsRouter.getInstance().getRouter());
app.use('/api/carts', CartsRouter.getInstance().getRouter());
app.use('/api/sessions', SessionsRouter.getInstance().getRouter());
app.use('/', ViewsRouter.getInstance().getRouter());

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

initializeSocket(httpServer);