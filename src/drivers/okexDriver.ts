import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { OKEX } from "../config/exchanges";

export default class OkexDriver extends Driver {

    prepareUrl(): string {
        return `https://www.okex.com/api/v1/ticker.do?symbol=${this.pair.replace("/", "_")}`;
    }

    transformData(data: any): any {
        const exchange = data.ticker;
        return new Exchange({time: Date.now(), pairName: this.pair, ask: exchange.sell, bid: exchange.buy, exchangeName: OKEX});
    }

}