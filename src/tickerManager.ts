import { driversConfig } from "./config/driversConfig";

export namespace TickerManager {

    function runDriver (driverClass: any, pairName: any) {
        const driver = new driverClass(pairName);
        driver.sendRequest()
        .then(() => {
            runDriver(driverClass, pairName);
        });
    }

    export function startRequests() {

        for (const exchange of driversConfig.exchangesMapping) {
            const pairName = exchange.pair;
            for (const exchangeName of exchange.exchanges) {
                const driverClasses = driversConfig.driversMapping;
                const driverClass = (<any>driverClasses)[exchangeName];
                runDriver(driverClass, pairName);
            }
        }
    }

}