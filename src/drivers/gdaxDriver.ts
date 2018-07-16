import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { GDAX } from "../config/exchanges";

export default class GdaxDriver extends Driver {

    prepareUrl(): string {
        return `https://api.pro.coinbase.com/products/${this.pair.replace("/", "-")}/ticker`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: GDAX});
    }

}