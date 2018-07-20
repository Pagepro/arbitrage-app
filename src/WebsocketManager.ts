import * as WebSocket from "ws";
import server from "./server";

class WebsocketManager {

    private websocketServer = new WebSocket.Server({
        server,
        path: "/ws/websocket"
    });

    private static manager: WebsocketManager;

    private constructor() {
       this.websocketServer.on("connection", WebsocketManager.onWebsocketConnection);
        const wss = this.websocketServer;
        setInterval(() => {
            wss.clients.forEach((websocket: any) => {
                if (websocket.isAlive === false) {
                    return websocket.terminate();
                }
                websocket.isAlive = false;
                websocket.ping(() => {});
            });
        }, 30000);
    }

    public static getInstance(): WebsocketManager {
        if (this.manager == undefined) {
            this.manager = new WebsocketManager();
        }
        return this.manager;
    }

    public static onWebsocketConnection(webSocket: any) {
        webSocket.isAlive = true;
        webSocket.on("pong", WebsocketManager.heartbeat);
    }

    private static heartbeat(webSocket: any) {
      webSocket.isAlive = true;
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

export default WebsocketManager;