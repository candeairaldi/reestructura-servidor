import CustomRouter from './custom.router.js';
import SessionsController from '../controllers/sessions.controller.js';
import passport from 'passport';

export default class SessionsRouter extends CustomRouter {
    static #instance;

    constructor() {
        super();
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new SessionsRouter();
        }
        return this.#instance;
    }

    init() {
        this.post('/register', ['PUBLIC'], this.passportAuthentication('register'), SessionsController.getInstance().register);

        this.post('/login', ['PUBLIC'], this.passportAuthentication('login'), SessionsController.getInstance().login);

        this.get('/github', ['PUBLIC'], passport.authenticate('github', { scope: ['user:email'] }));

        this.get('/githubcallback', ['PUBLIC'], this.passportAuthentication('github'), SessionsController.getInstance().githubCallback);

        this.post('/restore', ['PUBLIC'], this.passportAuthentication('restore'), SessionsController.getInstance().restore);

        this.get('/current', ['USER', 'ADMIN'], this.passportAuthentication('jwt'), SessionsController.getInstance().current);

        this.post('/logout', ['USER', 'ADMIN'], SessionsController.getInstance().logout);
    }

    passportAuthentication(strategy) {
        return async (req, res, next) => {
            passport.authenticate(strategy, { session: false }, (error, user, info) => {
                if (error) {
                    return res.sendServerError(error.message);
                }
                if (!user) {
                    return res.sendUserError(info);
                }
                req.user = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    cart: user.cart,
                    role: user.role
                }
                next();
            })(req, res, next);
        }
    }
}