import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { GDAX } from "../config/exchanges";
import proxyConfig from "../config/proxy";
import createURL from "../util/urlCreator";

export default class GdaxDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "-");
        return `${createURL(GDAX)}${fixedPair}/ticker`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: GDAX});
    }

}