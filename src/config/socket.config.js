import { Server } from 'socket.io';
import MessagesServices from '../services/messages.services.js';

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer);
    // Se envían  mensajes al conectarse
    io.on('connection', async (socket) => {
        try {
            const messages = await MessagesServices.getMessages();
            socket.emit('loadMessages', messages);
        } catch (error) {
            socket.emit('loadMessages', []);
        }
        // Se guarda el mensaje en db y se envían mensajes a los clientes
        socket.on('saveMessage', async (user, text) => {
            try {
                await MessagesServices.addMessage(user, text);
                const messages = await MessagesServices.getMessages();
                io.emit('loadMessages', messages);
            } catch (error) {
                io.emit('loadMessages', []);
            }
        });
    });
}

export default initializeSocket;