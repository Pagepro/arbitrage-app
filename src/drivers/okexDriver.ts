import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { OKEX } from "../config/exchanges";
import createURL from "../util/urlCreator";

export default class OkexDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "_").toLowerCase();
        return `${createURL(OKEX)}${fixedPair}`;
    }

    transformData(data: any): any {
        const exchange = data.ticker;
        return new Exchange({time: Date.now(), pairName: this.pair, ask: exchange.sell, bid: exchange.buy, exchangeName: OKEX});
    }

}