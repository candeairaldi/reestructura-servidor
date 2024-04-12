import { Carts } from '../dao/factory.js';

export default class CartsServices {
    static #instance;

    constructor() { }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new CartsServices();
        }
        return this.#instance;
    }

    async createCart() {
        try {
            return await Carts.getInstance().createCart();
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            if (id.length !== 24) {
                return null;
            }
            return await Carts.getInstance().getCartById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateCart(id, products) {
        try {
            return await Carts.getInstance().updateCart(id, products);
        } catch (error) {
            throw error;
        }
    }
}