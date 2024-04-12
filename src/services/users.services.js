import { Users } from '../dao/factory.js';
import { createHash } from '../utils.js';
import CartsServices from '../services/carts.services.js';

export default class UsersServices {
    static #instance;

    constructor() { }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new UsersServices();
        }
        return this.#instance;
    }

    async createUser(user) {
        try {
            if (user.password && user.password.length > 0) {
                user.password = createHash(user.password);
            }
            const cart = await CartsServices.getInstance().createCart();
            user.cart = cart._id;
            return await Users.getInstance().createUser(user);
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            return await Users.getInstance().getUserByEmail(email);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, user) {
        try {
            return await Users.getInstance().updateUser(id, user);
        } catch (error) {
            throw error;
        }
    }
}