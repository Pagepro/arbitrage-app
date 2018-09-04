import errorHandler from "errorhandler";
import app, {
  greenlockApp
} from "./app";
import TickerManager from "./tickerManager";

/**
 * Error Handler. Provides full stack - remove for production
 */

if (process.env.ENV !== "production") {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const startCallback = () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
  TickerManager.getInstance().startRequests();
};

const server = greenlockApp
  ? greenlockApp.listen(80, 443, startCallback)
  : app.listen(app.get("port"), startCallback);

export default server;