import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { GDAX } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class GdaxDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "-");

        if (!proxyConfig.usage[GDAX]) {
            return `https://api.pro.coinbase.com/products/${fixedPair}/ticker`;
        } else {
            const {
                URLs: proxyURLs
            } = proxyConfig;

            const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

            if (proxyRandom < proxyURLs.length) {
                return `${proxyURLs[proxyRandom]}market=gdax&coin=${fixedPair}`;
            } else {
                return `https://api.pro.coinbase.com/products/${fixedPair}/ticker`;
            }
        }
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: GDAX});
    }

}