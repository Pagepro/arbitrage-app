const axios = require("axios");

import { driversConfig } from "../config/driversConfig";

export default abstract class Driver {

    pair: string;

    constructor(pair: string) {
        this.pair = pair;
        this.sendRequest = this.sendRequest.bind(this);
        this.prepareUrl = this.prepareUrl.bind(this);
        this.transformData = this.transformData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    abstract prepareUrl(): string;

    abstract transformData(data: any): any;

    private saveData(exchange: any) {
        if (!exchange.ask || !exchange.bid)
            return driversConfig.timeInterval;
        exchange.save((error: any) => {
            if (error)
                throw error;
        });
        return driversConfig.timeInterval;
    }

    public sendRequest(timeoutValue: number) {
        axios.get(this.prepareUrl(), {
            timeout: timeoutValue
        }).then(({ data }: { data: any }) => data)
        .then(this.transformData)
        .then(this.saveData)
        .then(this.sendRequest)
        .catch((error: any) => {
            console.log(error);
        });
    }

}