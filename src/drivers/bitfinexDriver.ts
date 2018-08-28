import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITFINEX } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class BitfinexDriver extends Driver {

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");

        if (!proxyConfig.usage[BITFINEX]) {
            return `https://api.bitfinex.com/v1/pubticker/${firstCurrency}${secondCurrency}`;
        } else {
            const {
                URLs: proxyURLs
            } = proxyConfig;

            const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

            if (proxyRandom < proxyURLs.length) {
                return `${proxyURLs[proxyRandom]}market=bitfinex&coin=${firstCurrency}${secondCurrency}`;
            } else {
                return `https://api.bitfinex.com/v1/pubticker/${firstCurrency}${secondCurrency}`;
            }
        }
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITFINEX});
    }

}