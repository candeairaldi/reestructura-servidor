import CustomRouter from './custom.router.js';
import ProductsController from '../controllers/products.controller.js';

export default class ProductsRouter extends CustomRouter {
    static #instance;

    constructor() {
        super();
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new ProductsRouter();
        }
        return this.#instance;
    }

    init() {
        this.get('/', ['USER', 'ADMIN'], ProductsController.getInstance().getProducts);

        this.get('/:pid', ['USER', 'ADMIN'], ProductsController.getInstance().getProductById);

        this.post('/', ['ADMIN'], this.validateProductFields, ProductsController.getInstance().createProduct);

        this.put('/:pid', ['ADMIN'], this.validateProductFields, ProductsController.getInstance().updateProduct);

        this.delete('/:pid', ['ADMIN'], ProductsController.getInstance().deleteProduct);
    }

    validateProductFields(req, res, next) {
        const product = req.body;
        if (!product.title || !product.code) {
            return res.sendUserError('Faltan completar campos obligatorios');
        }
        next();
    }
}