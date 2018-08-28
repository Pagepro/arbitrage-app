import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { POLONIEX } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class PoloniexDriver extends Driver {

    prepareUrl(): string {
        if (!proxyConfig.usage[POLONIEX]) {
            return `https://poloniex.com/public?command=returnTicker`;
        } else {
            // To do
            // Poloniex is different than other exchanges - we don't know we'll deal with it
            return `https://poloniex.com/public?command=returnTicker`;
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