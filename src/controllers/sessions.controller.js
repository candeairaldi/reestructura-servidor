import { generateToken } from "../utils.js";

export default class SessionsController {
    static #instance;

    constructor() { }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new SessionsController();
        }
        return this.#instance;
    }

    async register(req, res) {
        res.sendSuccessMessage('Usuario registrado exitosamente');
    }

    async login(req, res) {
        generateToken(res, req.user);
        res.sendSuccessPayload(req.user);
    }

    async restore(req, res) {
        res.sendSuccessMessage('Contraseña restaurada exitosamente');
    }

    async current(req, res) {
        res.sendSuccessPayload(req.user);
    }

    async logout(req, res) {
        res.clearCookie('token');
        res.sendSuccessMessage('Sesión cerrada exitosamente');
    }
}