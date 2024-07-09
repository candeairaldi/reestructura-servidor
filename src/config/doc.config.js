import __dirname from '../utils/dirname.utils.js';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación proyecto coder',
            version: '1.0.0',
            description: 'Endpoints de la API del ecommerce'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export default swaggerSpecs;