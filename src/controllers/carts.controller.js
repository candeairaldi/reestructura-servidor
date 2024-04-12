import CartsServices from '../services/carts.services.js';
import ProductsServices from '../services/products.services.js';

export default class CartsController {
    static #instance;

    constructor() { }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new CartsController();
        }
        return this.#instance;
    }

    async createCart(req, res) {
        try {
            const payload = await CartsServices.getInstance().createCart();
            res.sendSuccessPayload(payload);
        } catch (error) {
            console.log(error);
            res.sendServerError(error.message);
        }
    }

    async getCartById(req, res) {
        try {
            const { cid } = req.params;
            const payload = await CartsServices.getInstance().getCartById(cid);
            if (!payload) {
                return res.sendUserError(`No existe un carrito con el id ${cid}`);
            }
            res.sendSuccessPayload(payload);
        } catch (error) {
            console.log(error);
            res.sendServerError(error.message);
        }
    }

    async addProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await CartsServices.getInstance().getCartById(cid);
            if (!cart) {
                return res.sendUserError(`No existe un carrito con el id ${cid}`);
            }
            const product = await ProductsServices.getInstance().getProductById(pid);
            if (!product) {
                return res.sendUserError(`No existe un producto con el id ${pid}`);
            }
            const productIndex = cart.products.findIndex(product => product.product._id.toString() === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }
            const payload = await CartsServices.getInstance().updateCart(cid, cart.products);
            res.sendSuccessPayload(payload);
        } catch (error) {
            console.log(error);
            res.sendServerError(error.message);
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await CartsServices.getInstance().getCartById(cid);
            if (!cart) {
                return res.sendUserError(`No existe un carrito con el id ${cid}`);
            }
            const product = await ProductsServices.getInstance().getProductById(pid);
            if (!product) {
                return res.sendUserError(`No existe un producto con el id ${pid}`);
            }
            const productIndex = cart.products.findIndex(product => product.product._id.toString() === pid);
            if (productIndex === -1) {
                return res.sendUserError(`No se encontro el producto con id ${pid} en el carrito con id ${cid}`);
            }
            cart.products[productIndex].quantity = quantity;
            const payload = await CartsServices.getInstance().updateCart(cid, cart.products);
            res.sendSuccessPayload(payload);
        } catch (error) {
            console.log(error);
            res.sendServerError(error.message);
        }
    }

    async removeProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await CartsServices.getInstance().getCartById(cid);
            if (!cart) {
                return res.sendUserError(`No existe un carrito con el id ${cid}`);
            }
            const product = await ProductsServices.getInstance().getProductById(pid);
            if (!product) {
                return res.sendUserError(`No existe un producto con el id ${pid}`);
            }
            const productIndex = cart.products.findIndex(product => product.product._id.toString() === pid);
            if (productIndex === -1) {
                return res.sendUserError(`No se encontro el producto con id ${pid} en el carrito con id ${cid}`);
            }
            cart.products.splice(productIndex, 1);
            const payload = await CartsServices.getInstance().updateCart(cid, cart.products);
            res.sendSuccessPayload(payload);
        } catch (error) {
            console.log(error);
            res.sendServerError(error.message);
        }
    }

    async updateCart(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const cart = await CartsServices.getInstance().getCartById(cid);
            if (!cart) {
                return res.sendUserError(`No existe un carrito con el id ${cid}`);
            }
            for (const p of products) {
                const pid = p.product;
                const quantity = p.quantity ? (parseInt(p.quantity) < 1 || isNaN(parseInt(p.quantity)) ? 1 : parseInt(p.quantity)) : 1;
                const product = await ProductsServices.getInstance().getProductById(pid);
                if (!product) {
                    return res.sendUserError(`No existe un producto con el id ${pid}`);
                }
                const productIndex = cart.products.findIndex(product => product.product._id.toString() === pid);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity = quantity;
                } else {
                    cart.products.push({ product: product._id, quantity });
                }
            }
            const payload = await CartsServices.getInstance().updateCart(cid, cart.products);
            res.sendSuccessPayload(payload);
        } catch (error) {
            console.log(error);
            res.sendServerError(error.message);
        }
    }

    async deleteCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await CartsServices.getInstance().getCartById(cid);
            if (!cart) {
                return res.sendUserError(`No existe un carrito con el id ${cid}`);
            }
            const payload = await CartsServices.getInstance().updateCart(cid, []);
            res.sendSuccessPayload(payload);
        } catch (error) {
            console.log(error);
            res.sendServerError(error.message);
        }
    }
}