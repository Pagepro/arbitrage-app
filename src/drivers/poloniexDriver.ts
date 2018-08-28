import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { POLONIEX } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class PoloniexDriver extends Driver {

    prepareUrl(): string {
        const exchangeURL = `https://poloniex.com/public?command=returnTicker`;
        if (!proxyConfig.usage[POLONIEX]) {
            return exchangeURL;
        } else {
            const {
                URLs: proxyURLs
            } = proxyConfig;

            const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

            if (proxyRandom < proxyURLs.length) {
                return `${proxyURLs[proxyRandom]}market=poloniex`;
            } else {
                return exchangeURL;
            }
        }
    }

    transformData(data: any): any {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");
        const fixedPair = `${secondCurrency}_${firstCurrency}`.replace("XLM", "STR");
        const exchange = data[fixedPair];
        return new Exchange({time: Date.now(), pairName: this.pair, ask: exchange.lowestAsk, bid: exchange.highestBid, exchangeName: POLONIEX});
    }

}