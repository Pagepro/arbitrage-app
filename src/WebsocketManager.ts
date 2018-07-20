import * as WebSocket from "ws";

import server from "./server";

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

export class WebsocketManager {

    private websocketServer = new WebSocket.Server({ server });

    private static manager: WebsocketManager;

    private constructor() {
        this.websocketServer.on("connection", (webSocket: any) => {
            webSocket.isAlive = true;
            webSocket.on("pong", heartbeat);
        });
        const wss = this.websocketServer;
        const interval = setInterval(function ping() {
            wss.clients.forEach(function each(websocket: any) {
              if (websocket.isAlive === false) return websocket.terminate();
              websocket.isAlive = false;
              websocket.ping(noop);
            });
          }, 30000);
    }

    public static getInstance(): WebsocketManager {
        if (this.manager == undefined)
            this.manager = new WebsocketManager();
        return this.manager;
    }

    public sendStringMessage(exchange: string) {
        this.websocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(exchange);
            }
        });
    }

    public sendObjectMessage(exchange: object) {
        this.sendStringMessage(JSON.stringify(exchange));
    }

}