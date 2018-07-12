import { driversConfig } from "./config/driversConfig";

export namespace TickerManager {

    export function startRequests() {
        // For every single currency pair
        for (let i = 0; i < driversConfig.exchangesMapping.length; i++) {
            // For all its exchanges
            const pair = driversConfig.exchangesMapping[i].pair;
            for (let j = 0; j < driversConfig.exchangesMapping[i].exchanges.length; j++) {
                const exchangeName = driversConfig.exchangesMapping[i].exchanges[j];
                const driverClasses = driversConfig.driversMapping;
                const driverClass = (<any>driverClasses)[exchangeName];
                const driver = new driverClass(pair);
                driver.sendRequest(driversConfig.timeInterval);
            }
        }
    }

}