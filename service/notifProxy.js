// File containing the backend for the websocket.

const { WebSocketServer } = require('ws');

function notifProxy(httpServer) {
    // Websocket object
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket) => {
        socket.isAlive = true;

        // Forward message to everyone except sender.
        socket.on('message', function message(data) {
            socketServer.clients.forEach(function each(client) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        // Respond to pong messages by marking the connection alive.
        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    // Periodically send a ping to ensure clients are alive.
    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000);
}