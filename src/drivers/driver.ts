const axios = require("axios");

import driversConfig from "../config/driversConfig";
import WebsocketManager from "../WebsocketManager";
import logger from "../util/logger";
import Exchange from "../models/schemas/exchangeDataSchema";
import Spread from "../models/schemas/spreadDataSchema";
import calculateSpread from "../util/spreadCalculator";
import { thresholdSpreadValue } from "../config/SlackConfig";
import SlackManager from "../SlackManager";
import { highSpreadValue } from "../config/serverConfig";

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

        for (const pairConfig of driversConfig.exchangesMapping) {
            if (pairConfig.pair === exchange.pairName) {
                for (const exchangeName of pairConfig.exchanges) {
                    if (exchangeName !== exchange.exchangeName) {

                        Exchange.findOne(
                            { pairName: exchange.pairName, exchangeName: exchangeName, time: { $gte: exchange.time - 10000 } },
                            undefined, {sort: {time: -1 }})
                        .then((data: any) => {

                            if (data) {
                                const buySpread = calculateSpread(exchange.ask, data.bid);
                                if (buySpread >= highSpreadValue) {
                                    const buySpreadTicker = new Spread({
                                        pairName: exchange.pairName,
                                        buyExchange: exchange.exchangeName,
                                        sellExchange: exchangeName,
                                        spread: buySpread,
                                        time: exchange.time});

                                    buySpreadTicker.save();

                                    if (buySpread >= thresholdSpreadValue) {
                                        SlackManager.getInstance().sendNotifications(buySpreadTicker);
                                    }
                                }

                                const sellSpread = calculateSpread(data.ask, exchange.bid);
                                if (sellSpread >= highSpreadValue) {
                                    const sellSpreadTicker = new Spread({
                                        pairName: exchange.pairName,
                                        buyExchange: exchangeName,
                                        sellExchange: exchange.exchangeName,
                                        spread: sellSpread,
                                        time: exchange.time});

                                    sellSpreadTicker.save();

                                    if (sellSpread >= thresholdSpreadValue) {
                                        SlackManager.getInstance().sendNotifications(sellSpreadTicker);
                                    }
                                }
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