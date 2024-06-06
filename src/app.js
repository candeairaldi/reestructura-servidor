import { program } from 'commander';
import initializePersistence from './dao/factory.js';
import express from 'express';
import cors from 'cors';
import compression from 'express-compression';
import __dirname from './utils/dirname.js';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import { addLogger } from './config/logger.config.js';
import handlebars from 'express-handlebars';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import SessionsRouter from './routes/sessions.router.js';
import swaggerSpecs from './config/doc.config.js';
import swaggerUi from 'swagger-ui-express';
import ViewsRouter from './routes/views.router.js';
import initializeSocket from './config/socket.config.js';

//Persistencia inicialización
program.option('-p, --persistence <type>', 'Tipo de persistencia (mongo o fs)').parse();
if (!program.opts().persistence) {
    console.log('El parámetro --persistence es obligatorio y debe ser mongo o fs');
    process.exit(1);
}
initializePersistence(program.opts().persistence);

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
app.use('/api/products', ProductsRouter.getInstance().getRouter());
app.use('/api/carts', CartsRouter.getInstance().getRouter());
app.use('/api/sessions', SessionsRouter.getInstance().getRouter());

// Documentación api
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//ruta vista
app.use('/', ViewsRouter.getInstance().getRouter());


//inicializacion de servidor
const httpServer = app.listen(config.port, () => console.log(`Servidor escuchando en el puerto ${config.port}`));

//inicializacion de socket.io
initializeSocket(httpServer);