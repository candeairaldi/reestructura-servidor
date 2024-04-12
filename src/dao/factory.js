import mongoose from 'mongoose';

import config from '../config/config.js';

const PERSISTENCE = config.persistence;
const MONGO_URL = config.mongoURL;

export let Products, Carts, Users, Messages;

switch (PERSISTENCE) {
    case 'MONGO':
        mongoose.connect(MONGO_URL)
            .then(() => console.log('Database connected'))
            .catch(error => console.log(`Database connection error: ${error}`));

        const { default: ProductsMongoDAO } = await import('../dao/mongo/products.mongo.DAO.js');
        Products = ProductsMongoDAO;

        const { default: CartsMongoDAO } = await import('../dao/mongo/carts.mongo.DAO.js');
        Carts = CartsMongoDAO;

        const { default: UsersMongoDAO } = await import('../dao/mongo/users.mongo.DAO.js');
        Users = UsersMongoDAO;

        const { default: MessagesMongoDAO } = await import('../dao/mongo/messages.mongo.DAO.js');
        Messages = MessagesMongoDAO;

        break;

    default:
        throw new Error('Invalid persistence type');
}