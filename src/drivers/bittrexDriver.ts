import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITTREX } from "../config/exchanges";
import proxyConfig from "../config/proxy";

export default class BittrexDriver extends Driver {

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");

        const fixedPair = `${secondCurrency}-${firstCurrency}`;

        if (!proxyConfig.usage[BITTREX]) {
            return `https://bittrex.com/api/v1.1/public/getticker?market=${fixedPair}`;
        } else {
            const {
                URLs: proxyURLs
            } = proxyConfig;

            const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

            if (proxyRandom < proxyURLs.length) {
                return `${proxyURLs[proxyRandom]}market=bittrex&coin=${fixedPair}`;
            } else {
                return `https://bittrex.com/api/v1.1/public/getticker?market=${fixedPair}`;
            }
        }

    }

    transformData(data: any): any {
        const result = data.result;
        return new Exchange({time: Date.now(), pairName: this.pair, ask: result.Ask, bid: result.Bid, exchangeName: BITTREX});
    }

}