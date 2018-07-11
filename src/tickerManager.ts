import { driversConfig } from "./config/driversConfig";

export namespace TickerManager {

    export function startRequests() {
        // For every single currency pair
        for (let i = 0; i < driversConfig.exchangesMapping.length; i++) {
            // For all its exchanges
            for (let j = 0; j < driversConfig.exchangesMapping[i].exchanges.length; j++) {
                // Start sending requests for pair on specific exchange
            }
        }
    }

}