class EventEmitter {
  listeners;
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    let listeners = [];
    if (this.listeners.has(event)) {
      listeners = [...this.listeners.get(event), listener];
    } else {
      listeners = [listener];
    }
    this.listeners.set(event, listeners);
  }

  off(event) {
    if (this.listeners.has(event)) {
      this.listeners.delete(event);
    }
  }
}
class Socket extends EventEmitter {

  uri;
  ws;
  connected = false;
  pingTimeoutTimer;
  reconnectTimer;
  pingTimeoutDelay = 1000;
  reconnectionDelay = 1000;
  shouldReconnect = true;

  pingDisconnectTimeoutTimer;
  pingDisconnectTimeoutDelay = 3000;

  pingTimeout;

  mapCallback;

  constructor(uri, opt) {
    super();
    this.uri = uri;
    if (opt.pingTimeoutDelay >= opt.pingDisconnectTimeoutDelay) {
      throw new Error("pingTimeoutDelay >= pingDisconnectTimeoutDelay")
    }
    this.pingTimeoutDelay = opt.pingTimeoutDelay;
    this.pingDisconnectTimeoutDelay = opt.pingDisconnectTimeoutDelay;
    this.reconnectionDelay = opt.reconnectionDelay;
    this.open();
  }

  open() {
    this.ws = new WebSocket(this.uri);

    this.ws.addEventListener("open", (event) => {
      // console.log("OPEN")
      this.connected = true;
      
      this.ping();
    });

    this.ws.addEventListener("message", (event) => this.onMessage(event));

    this.ws.addEventListener("close", (event) => this.onClose("transport close"));
  }

  onMessage(event) {
    const { data } = event;
    switch (data) {
      case "pong": {
        this.ping();
        break;
      }
      default: {
        const { type, message } = JSON.parse(data);
        const event = "channel:" + type;
        if (this.listeners.has(event)) {
          const listeners = this.listeners.get(event);
          for (const listener of listeners) {
            listener({
              message: message
            });
          }
        }
      }
    }
  }

  ping() {
    // console.log("START PING")
    clearTimeout(this.pingTimeoutTimer);
    this.pingTimeoutTimer = setTimeout(() => {
      // console.log("PING")
      this.resetPingTimeout();
      this.send("ping");
    }, this.pingTimeoutDelay);
  }

  onClose(reason) {
    // console.log("ON CLOSE: " + reason)
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      // console.log("CLIENT CALL CLOSE")
      this.ws.close();
    }

    clearTimeout(this.pingTimeoutTimer);
    clearTimeout(this.pingDisconnectTimeoutTimer);
    clearTimeout(this.reconnectTimer);

    if (this.connected) {
      this.connected = false;
    }

    this.reconnect();
  }

  reconnect() {
    if (this.shouldReconnect) {
      this.reconnectTimer = setTimeout(() => {
        this.open();
      }, this.reconnectionDelay);
    }
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    }
  }

  resetPingTimeout() {
    // console.log("START DISCONNECT BY PING TIMEOUT")
    clearTimeout(this.pingDisconnectTimeoutTimer);
    this.pingDisconnectTimeoutTimer = setTimeout(() => {
      // console.log("DISCONNECT BY PING TIMEOUT")
      this.onClose("ping timeout");
    }, this.pingDisconnectTimeoutDelay);
  }

  disconnect() {
    this.shouldReconnect = false;
    this.onClose("client disconnect");
  }
}

export default Socket;