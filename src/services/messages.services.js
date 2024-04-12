import { Messages } from '../dao/factory.js';

export default class MessagesServices {
    static #instance;

    constructor() { }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MessagesServices();
        }
        return this.#instance;
    }

    async addMessage(user, message) {
        try {
            return await Messages.getInstance().addMessage(user, message);
        } catch (error) {
            throw error;
        }
    }

    async getMessages() {
        try {
            return await Messages.getInstance().getMessages();
        } catch (error) {
            throw error;
        }
    }
}