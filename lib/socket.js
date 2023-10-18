class Socket {

  uri;
  ws;
  connected = false;
  pingTimeoutTimer;
  reconnectTimer;
  pingTimeoutDelay;
  reconnectionDelay;

  constructor(uri, opt) {
    this.uri = uri;
    this.pingTimeoutDelay = opt.pingTimeoutDelay;
    this.reconnectionDelay = opt.reconnectionDelay;
    this.open();
  }

  open() {
    this.ws = new WebSocket("ws://localhost:8080/myHandler/9fad9a7d-1a1b-47f2-9cea-66abb7719968");

    this.ws.addEventListener("open", (event) => {
      console.log("OPEN")
      this.connected = true;
      
      this.resetPingTimeout();
    });

    this.ws.addEventListener("message", (event) => this.onMessage(event));

    this.ws.addEventListener("close", (event) => this.onClose("transport close"));
  }

  onMessage(event) {
    const { data } = event;
    if (data === "pong") {
      this.resetPingTimeout();
      this.send("ping");
    }
  }

  onClose(reason) {
    if (this.ws) {
      this.ws.close();
    }

    clearTimeout(this.pingTimeoutTimer);
    clearTimeout(this.reconnectTimer);

    if (this.connected) {
      this.connected = false;
    }

    if (this.shouldReconnect) {
      this.reconnectTimer = setTimeout(() => {
        this.onOpen();
      }, this.reconnectionDelay);
    }
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    }
  }

  resetPingTimeout() {
    clearTimeout(this.pingTimeoutTimer);
    this.pingTimeoutTimer = setTimeout(() => {
      onClose("ping timeout");
    }, this.pingTimeoutDelay);
  }

  disconnect() {
    this.shouldReconnect = false;
    this.onClose("client disconnect");
  }
}

export default Socket;