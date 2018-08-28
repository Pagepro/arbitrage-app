import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";
import { BITFINEX } from "../config/exchanges";
import { bitfinexProxy } from "../config/proxy";

export default class BitfinexDriver extends Driver {

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");

        const marketsURLs = bitfinexProxy.map(url => `${url}${firstCurrency}${secondCurrency}`);

        const marketRandom = Math.floor(Math.random() * marketsURLs.length);
        return marketsURLs[marketRandom];
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITFINEX});
    }

}