
// Manage websocket. Send the "messages" which will be the username and the tag of the recipe uploaded.
class notificationClient {
    observers = [];     // Observers are objects with an event type, username of the person who submitted the recipe, and the tag.
    connected = false;

    constructor() {
        // Adjust websocket protocol for connection protocol.
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        console.log("notificationClient opened " + this.socket);
        
        this.socket.onopen = (event) => {
            // We verify the connection by putting it into observers.
            this.notifyObservers('system', 'websocket', 'connected');
            this.connected = true;
        };

        // display
        this.socket.onmessage = async (event) => {
            console.log("socket.onmessage");
            const text = await event.data.text();
            const notify = JSON.parse(text);
            this.notifyObservers('received', notify.newUploadUser, notify.tag);
        };

        // close.
        this.socket.onclose = (event) => {
            this.notifyObservers('system', 'websocket', 'disconnected');
            this.connected = false;
        }

    }

    uploadNotification(newUploadUser, tag) {
        console.log("Uploading " + newUploadUser + " " + tag);
        this.notifyObservers('sent', newUploadUser, tag);
        this.socket.send(JSON.stringify({ newUploadUser, tag }));
    }

    // Add an observer to the observer array.
    addObserver(observer) {
        console.log("Added Observer: " + observer);
        this.observers.push(observer);
    }

    // username for the name, tag for the recipe tag.
    notifyObservers(event, username, tag) {
        console.log("notifyObservers running");
        this.observers.forEach((h) => h({ event, username, tag }));
    }
}

export {notificationClient};