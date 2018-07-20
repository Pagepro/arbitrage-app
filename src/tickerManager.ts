import driversConfig from "./config/driversConfig";

/*
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
*/

class TickerManager {

    private static manager: TickerManager;

    private constructor() {
        this.runDriver = this.runDriver.bind(this);
        this.startRequests = this.startRequests.bind(this);
    }

    public static getInstance(): TickerManager {
        if (this.manager == undefined) {
            this.manager = new TickerManager();
        }
        return this.manager;
    }

    private runDriver (driverClass: any, pairName: any) {
        const driver = new driverClass(pairName);
        driver.sendRequest()
        .then(() => {
            this.runDriver(driverClass, pairName);
        });
    }

    public startRequests() {
        for (const exchange of driversConfig.exchangesMapping) {
            const pairName = exchange.pair;
            for (const exchangeName of exchange.exchanges) {
                const driverClasses = driversConfig.driversMapping;
                const driverClass = (<any>driverClasses)[exchangeName];
                this.runDriver(driverClass, pairName);
            }
        }
    }

}

export default TickerManager;