import driversConfig from "./config/driversConfig";

class TickerManager {

    private static manager: TickerManager;

    private constructor() {
        this.runDriver = this.runDriver.bind(this);
        this.startRequests = this.startRequests.bind(this);
    }

    public static getInstance(): TickerManager {
        return this.manager || (this.manager = new TickerManager());
    }

    private runDriver (driverClass: any, pairName: any) {
        const driver = new driverClass(pairName);
        const {
            timeInterval
        } = driversConfig;
        driver.sendRequest()
        .then(() => {
            setTimeout(() => {
                this.runDriver(driverClass, pairName);
            }, timeInterval);
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