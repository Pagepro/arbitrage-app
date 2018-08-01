const axios = require("axios");

import driversConfig from "../config/driversConfig";
import WebsocketManager from "../WebsocketManager";
import logger from "../util/logger";
import Exchange from "../models/schemas/exchangeDataSchema";
import Spread from "../models/schemas/spreadDataSchema";
import calculateSpread from "../util/spreadCalculator";

export default abstract class Driver {

    pair: string;

    constructor(pair: string) {
        this.pair = pair;
        this.sendRequest = this.sendRequest.bind(this);
        this.prepareUrl = this.prepareUrl.bind(this);
        this.transformData = this.transformData.bind(this);
        this.saveData = this.saveData.bind(this);
        this.saveSpreads = this.saveSpreads.bind(this);
    }

    abstract prepareUrl(): string;

    abstract transformData(data: any): any;

    private saveData(exchange: any) {
        if (!exchange.ask || !exchange.bid) return;
        exchange.save((error: any) => {
          if (error) {
              logger.log("error", error.message);
              return;
          }

          WebsocketManager.getInstance().sendObjectMessage(exchange);
        });
        return exchange;
    }

    public saveSpreads(exchange: any) {
        if (exchange === undefined) return;
        /* Saving spreads */
        for (let i = 0; i < driversConfig.exchangesMapping.length; i++) {
            if (driversConfig.exchangesMapping[i].pair === exchange.pairName) {
                for (let j = 0; j < driversConfig.exchangesMapping[i].exchanges.length; j++) {
                const secondExchangeName = driversConfig.exchangesMapping[i].exchanges[j];
                    if (secondExchangeName !== exchange.exchangeName) {

                        Exchange.findOne({ pairName: exchange.pairName, exchangeName: secondExchangeName }, undefined, {sort: {time: -1 }})
                        .then((data: any) => {
                            if (exchange.time - data.time < 10000) {
                                const buySpread = calculateSpread(exchange.ask, data.bid);
                                const buySpreadTicker = new Spread({pairName: exchange.pairName, buyExchange: exchange.exchangeName, sellExchange: secondExchangeName, spread: buySpread, time: exchange.time});
                                buySpreadTicker.save((error: any) => {
                                });
                                const sellSpread = calculateSpread(data.ask, exchange.bid);
                                const sellSpreadTicker = new Spread({pairName: exchange.pairName, buyExchange: secondExchangeName, sellExchange: exchange.exchangeName, spread: buySpread, time: exchange.time});
                                sellSpreadTicker.save((error: any) => {
                                });
                            }
                        });
                    }
                }
            }
        }
    }

    public sendRequest() {
        return axios.get(this.prepareUrl(), {
            timeout: driversConfig.timeInterval
        }).then(({ data }: { data: any }) => data)
        .then(this.transformData)
        .then(this.saveData)
        .then(this.saveSpreads)
        .catch((error: any) => {
            logger.log("error", error.message);
        });
    }

}