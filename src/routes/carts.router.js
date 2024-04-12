import CustomRouter from './custom.router.js';
import CartsController from '../controllers/carts.controller.js';

export default class CartsRouter extends CustomRouter {
    static #instance;

    constructor() {
        super();
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new CartsRouter();
        }
        return this.#instance;
    }

    init() {
        this.post('/', ['PUBLIC'], CartsController.getInstance().createCart);

        this.get('/:cid', ['PUBLIC'], CartsController.getInstance().getCartById);

        this.post('/:cid/products/:pid', ['USER'], this.validateQuantity, CartsController.getInstance().addProduct);

        this.put('/:cid/products/:pid', ['USER'], this.validateQuantity, CartsController.getInstance().updateProductQuantity);

        this.delete('/:cid/products/:pid', ['USER'], CartsController.getInstance().removeProduct);

        this.put('/:cid', ['PUBLIC'], CartsController.getInstance().updateCart);

        this.delete('/:cid', ['USER'], CartsController.getInstance().deleteCart);
    }

    validateQuantity(req, res, next) {
        const { quantity } = req.body;
        req.body.quantity = quantity ? (parseInt(quantity) < 1 || isNaN(parseInt(quantity)) ? 1 : parseInt(quantity)) : 1;
        next();
    }
}