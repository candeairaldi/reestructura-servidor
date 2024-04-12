import CustomRouter from './custom.router.js';
import ViewsController from '../controllers/views.controller.js';

export default class ViewsRouter extends CustomRouter {
    static #instance;

    constructor() {
        super();
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new ViewsRouter();
        }
        return this.#instance;
    }

    init() {
        this.get('/', ['PUBLIC'], ViewsController.getInstance().renderIndex);

        this.get('/login', ['PUBLIC'], ViewsController.getInstance().renderLogin);

        this.get('/register', ['PUBLIC'], ViewsController.getInstance().renderRegister);

        this.get('/restore', ['PUBLIC'], ViewsController.getInstance().renderRestore);

        this.get('/products', ['USER'], ViewsController.getInstance().renderProducts);

        this.get('/product/:pid', ['USER'], ViewsController.getInstance().renderProduct);

        this.get('/cart/:cid', ['USER'], ViewsController.getInstance().renderCart);

        this.get('/profile', ['USER'], ViewsController.getInstance().renderProfile);

        this.get('/chat', ['USER'], ViewsController.getInstance().renderChat);

        this.get('/admin/products', ['ADMIN'], ViewsController.getInstance().renderAdminProducts);

        this.get('/admin/add-product', ['ADMIN'], ViewsController.getInstance().renderAdminAddProduct);

        this.get('/admin/edit-product/:pid', ['ADMIN'], ViewsController.getInstance().renderAdminEditProduct);

        this.get('*', ['ALL'], ViewsController.getInstance().redirectToCorrectView);
    }
}