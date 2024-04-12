import cartModel from './models/cart.model.js';

export default class CartsMongoDAO {
    static #instance;

    constructor() { }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new CartsMongoDAO();
        }
        return this.#instance;
    }

    async createCart() {
        try {
            return await cartModel.create({});
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            return await cartModel.findOne({ _id: id }).lean();
        } catch (error) {
            throw error;
        }
    }

    async updateCart(id, products) {
        try {
            return await cartModel.findByIdAndUpdate(id, { products }, { new: true });
        } catch (error) {
            throw error;
        }
    }
}