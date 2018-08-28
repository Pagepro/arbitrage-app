import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITSTAMP } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class BitstampDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "").toLowerCase();

        if (!proxyConfig.usage[BITSTAMP]) {
            return `https://www.bitstamp.net/api/v2/ticker/${fixedPair}`;
        } else {
            const {
                URLs: proxyURLs
            } = proxyConfig;

            const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

            if (proxyRandom < proxyURLs.length) {
                return `${proxyURLs[proxyRandom]}market=bitstamp&coin=${fixedPair}`;
            } else {
                return `https://www.bitstamp.net/api/v2/ticker/${fixedPair}`;
            }
        }
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITSTAMP});
    }

}