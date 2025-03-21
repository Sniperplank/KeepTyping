import { io } from 'socket.io-client';

// Create a singleton socket instance
const socket = io("https://keep-typing-server.onrender.com/", {
    transports: ['websocket'],
    reconnection: true,
    autoConnect: true
});

// Add debugging to track socket connections
socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

// Export the socket instance
export default socket;