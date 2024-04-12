const socket = io();
const message = document.querySelector('#message');

function handleKeyDown(event, user) {
    if (event.key === 'Enter') {
        sendMessage(user);
    }
}

function sendMessage(user) {
    if (message.value) {
        socket.emit('message', user, message.value);
        message.value = '';
    }
}

socket.on('messages', messages => {
    const chatMessages = document.querySelector('#chatMessages');
    chatMessages.innerHTML = '';
    messages.forEach(message => {
        const date = new Date(message.date).toLocaleDateString();
        const hour = new Date(message.date).toLocaleTimeString();
        chatMessages.innerHTML += `<p>${date} ${hour} ${message.user.first_name} ${message.user.last_name} dijo: ${message.message}</p>`
    });
});