import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BINANCE } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class BinanceDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "");
        const exchangeURL = `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${fixedPair}`;

        if (!proxyConfig.usage[BINANCE]) {
            return exchangeURL;
        } else {
            const {
                URLs: proxyURLs
            } = proxyConfig;

            const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

            if (proxyRandom < proxyURLs.length) {
                return `${proxyURLs[proxyRandom]}market=binance&coin=${fixedPair}`;
            } else {
                return exchangeURL;
            }
        }
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.askPrice, bid: data.bidPrice, exchangeName: BINANCE});
    }

}