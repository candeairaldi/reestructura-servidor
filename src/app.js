import options from './config/args.config.js';
import initializePersistence from './dao/factory.js';
import express from 'express';
import cors from 'cors';
import compression from 'express-compression';
import __dirname from './utils/dirname.utils.js';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import { addLogger } from './config/logger.config.js';
import handlebars from 'express-handlebars';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import SessionsRouter from './routes/sessions.router.js';
import UsersRouter from './routes/users.router.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import TicketsRouter from './routes/tickets.router.js';
import swaggerSpecs from './config/doc.config.js';
import swaggerUi from 'swagger-ui-express';
import ViewsRouter from './routes/views.router.js';
import initializeSocket from './config/socket.config.js';

// Inicialización de la persistencia
initializePersistence(options.storage);

//Iniciar express
const app = express();



//middlewares
app.use(cors());
app.use(compression({ brotli: { enabled: true, zlib: {} } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser(config.cookieSecret));
app.use(addLogger);


//conf de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


//Inicializacion de passport
initializePassport();
app.use(passport.initialize());

//rutas api
app.use('/api/sessions', SessionsRouter.getInstance().getRouter());
app.use('/api/users', UsersRouter.getInstance().getRouter());
app.use('/api/products', ProductsRouter.getInstance().getRouter());
app.use('/api/carts', CartsRouter.getInstance().getRouter());
app.use('/api/tickets', TicketsRouter.getInstance().getRouter());



// Documentación api
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//ruta vista
app.use('/', ViewsRouter.getInstance().getRouter());


//inicializacion de servidor
const httpServer = app.listen(config.port, () => console.log(`Servidor escuchando en puerto ${config.port}`));

//inicializacion de socket.io
initializeSocket(httpServer);