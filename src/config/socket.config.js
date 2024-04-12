import { Server } from 'socket.io';
import MessagesServices from '../services/messages.services.js';

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer);
    io.on('connection', async (socket) => {
        try {
            const messages = await MessagesServices.getInstance().getMessages();
            socket.emit('messages', messages);
        } catch (error) {
            socket.emit('messages', []);
        }

        socket.on('message', async (userId, message) => {
            try {
                await MessagesServices.getInstance().addMessage(userId, message);
                const messages = await MessagesServices.getInstance().getMessages();
                io.emit('messages', messages);
            } catch (error) {
                io.emit('messages', []);
            }
        });
    });
}

export default initializeSocket;