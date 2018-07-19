import * as WebSocket from "ws";

import server from "./server";

export class WebsocketManager {

    private websocketServer = new WebSocket.Server({ server });

    private static manager: WebsocketManager;

    private constructor() {
        this.websocketServer.on("connection", (webSocket: WebSocket) => {
            console.log(`Clients number: ${this.websocketServer.clients.size}`);
        });
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