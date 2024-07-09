import winston from 'winston';
import options from './args.config.js';

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'gray',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'green'
    }
};

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'errors.log'
        })
    ]
});

winston.addColors(customLevelOptions.colors);

export const addLogger = (req, res, next) => {
    // entorno de ejecución
    const environment = options.environment;
    // Se carga el logger
    const logger = environment === 'development' ? devLogger : prodLogger;
    // métodos 
    Object.keys(customLevelOptions.levels).forEach(level => {
        logger[level] = (message) => logger.log({ level, message });
    });
    // No se loguean las peticiones: vistas y documentación de la API
    if (!req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/api/docs')) {
        return next();
    }
    // fecha y hora de petición
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    // Se loguea la petición
    logger.http(`${req.method} ${req.originalUrl} ${currentDate} ${currentTime}`);
    // logger a la petición
    req.logger = logger;
    next();
};