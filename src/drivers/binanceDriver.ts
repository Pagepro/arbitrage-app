import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BINANCE } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class BinanceDriver extends Driver {

    prepareUrl(): string {
        if (!proxyConfig.usage[BINANCE]) {
            return `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${this.pair.replace("/", "")}`;
        } else {
            const {
                URLs: proxyURLs
            } = proxyConfig;

            const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

            if (proxyRandom < proxyURLs.length) {
                return `${proxyURLs[proxyRandom]}market=binance&coin=${this.pair.replace("/", "")}`;
            } else {
                return `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${this.pair.replace("/", "")}`;
            }
        }
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.askPrice, bid: data.bidPrice, exchangeName: BINANCE});
    }

}