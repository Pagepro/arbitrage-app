import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { GDAX } from "../config/exchanges";

export default class GdaxDriver extends Driver {

    prepareUrl(): string {
        return ``;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.sell, bid: data.buy, exchangeName: GDAX});
    }

}