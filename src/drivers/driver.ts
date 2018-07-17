const axios = require("axios");

import { driversConfig } from "../config/driversConfig";
import logger from "../util/logger";

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
        if (!exchange.ask || !exchange.bid) return;
        exchange.save((error: any) => {
            if (error) {
                logger.log("error", error.message);
            }
        });
    }

    public sendRequest() {
        return axios.get(this.prepareUrl(), {
            timeout: driversConfig.timeInterval
        }).then(({ data }: { data: any }) => data)
        .then(this.transformData)
        .then(this.saveData)
        .catch((error: any) => {
            logger.log("error", error.message);
        });
    }

}