class NotifClient {
    observers = []
    connected = false;

    constructor() {
        // adjust for http if needed.
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        // Display the websocket has been opened.
        this.socket.onopen = (event) => {
            this.notifyObservers('system', 'websocket', 'connected');
            this.connected = true;
        };

        // Display notification received.
        this.socket.onmessage = async (event) => {
            const text = await event.data.text();
            const notif = JSON.parse(text);
            this.notifyObservers('received', notif.username, notif.tag);
        };
    }

    // send notification over websocket.
    sendNotification(username, tag) {
        this.notifyObservers('sent', username, tag);
        this.socket.send(JSON.stringify({ username, tag }));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(event, user, t) {
        this.observers.forEach((h) => h({ event, user, t }));
    }
}

export { NotifClient }