import * as WebSocket from "ws";
import server from "./server";
import Spread from "./models/schemas/spreadDataSchema";

class WebsocketManager {

    private websocketServer = new WebSocket.Server({
        server,
        path: "/ws/exchanges"
    });

    private static manager: WebsocketManager;

    private constructor() {
       this.initializeWebsocketConnections();
    }

    public static getInstance(): WebsocketManager {
        return this.manager || (this.manager = new WebsocketManager());
    }

    private initializeWebsocketConnections() {
        const wss = this.websocketServer;
        wss.on("connection", WebsocketManager.onWebsocketConnection);
        setInterval(() => {
            wss.clients.forEach((websocket: any) => {
                if (websocket.isAlive === false) {
                    return websocket.terminate();
                }

                websocket.isAlive = false;
                websocket.ping(() => {});
            });
        }, 10000);
    }

    private static onWebsocketConnection(webSocket: any) {
        webSocket.isAlive = true;
        webSocket.on("pong", WebsocketManager.heartbeat);
    }

    private static heartbeat(webSocket: any) {
      webSocket.isAlive = true;
    }

    public sendStringMessage(exchange: string) {
        this.websocketServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(exchange);
            }
        });
    }

    public sendObjectMessage(exchange: object) {
        this.sendStringMessage(JSON.stringify(exchange));
    }

}

export default WebsocketManager;