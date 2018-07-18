import errorHandler from "errorhandler";

import app from "./app";

import { TickerManager } from "./tickerManager";

import Exchange from "./models/schemas/exchangeDataSchema";

/**
 * Error Handler. Provides full stack - remove for production
 */

if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
  // TickerManager.startRequests();
});


/* WebSocket */

import * as WebSocket from "ws";

const websocketServer = new WebSocket.Server({ server });

websocketServer.on("connection", (webSocket: WebSocket) => {
  webSocket.on("message", (message: string) => {
    const jsonMessage = JSON.parse(message);
    const pair = jsonMessage.pair;
    const buyExchange = jsonMessage.buyExchange;
    const sellExchange = jsonMessage.sellExchange;
    Exchange.findOne({pairName: pair, exchangeName: buyExchange}, undefined, {sort: {time: -1 }})
    .then((buyTicker: any) => {
    if (buyTicker === null) return;
    let timeDifference = Math.abs(Date.now() - buyTicker.time);
    /*
    if (timeDifference > 10000) {
      res.send("Buy ticker is older than 10 seconds.");
      return;
    }
    */
      const buyValue = buyTicker.ask;
      Exchange.findOne({pairName: pair, exchangeName: sellExchange}, undefined, {sort: {time: -1 }})
      .then((sellTicker: any) => {
        if (sellTicker === null) return;
        timeDifference = Math.abs(Date.now() - sellTicker.time);
        /*
        if (timeDifference > 10000) {
          res.send("Sell ticker is older than 10 seconds.");
          return;
        }
        */
        const sellValue = sellTicker.bid;
        const response = `{ "buy": ${buyValue}, "sell": ${sellValue} }`;
        webSocket.send(response);
      })
      .catch((error) => {
        console.log(error);
      });
    });
  });
});

export default server;